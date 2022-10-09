import "reflect-metadata";
import "dotenv/config";
import _ from "node-env-types";
import ip from "ip";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./resolvers";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import { dataSource } from "./db";
import Redis from "ioredis";

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
  app.use(express.json());
  app.use(cookieParser());
  app.use(router);
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);
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
              await serverCleanup.dispose();
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
    path: "/",
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
