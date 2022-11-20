import "reflect-metadata";
import "dotenv/config";
import _ from "node-env-types";
import ip from "ip";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./resolvers";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import { dataSource } from "./db";
import { join } from "path";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import Redis from "ioredis";
import { SubscriptionServer } from "subscriptions-transport-ws";

_();
const PORT: any = process.env.PORT || 3001;

(async () => {
  await dataSource
    .initialize()
    .then(() => {})
    .catch((error) => console.log(error));
  const redis = new Redis();
  const schema = await buildSchema({
    resolvers: [...Resolvers],
    validate: false,
  });
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(express.json({ limit: "10mb" }));
  app.use("/storage/images", express.static(join(__dirname, "../images")));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use(cookieParser());
  app.use(router);

  const httpServer = http.createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await subscriptionServer.close();
            },
          };
        },
      },
      ApolloServerPluginLandingPageGraphQLPlayground({}),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false,
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log();
  console.log(`\t Local: http:127.0.0.1:${PORT}${server.graphqlPath}`);
  console.log(`\t Network: http:${ip.address()}:${PORT}${server.graphqlPath}`);
  console.log();
})()
  .then(() => {})
  .catch((err) => console.log(err));
