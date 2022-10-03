import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User/User";
import { __cookieName__ } from "../constants";
import {
  createAccessToken,
  createRefreshToken,
  storeRefreshToken,
} from "../auth";

const router: Router = Router();

router.post("/aa", async (req: Request, res: Response) => {
  const token = req.cookies[__cookieName__];
  if (!token) {
    return res.status(401).send({
      code: 401,
      message: "UnAuthorized",
      ok: false,
      accessToken: "",
    });
  }
  let payload: any = null;
  try {
    let tokenToVerify: string = String(token)
      .toLocaleLowerCase()
      .includes("Bearer")
      ? token.split(" ")[1]
      : token;
    payload = jwt.verify(tokenToVerify, process.env.REFRESH_TOKEN_SECRETE);
  } catch (error) {
    console.error(error);
    return res.status(403).send({
      code: 403,
      message: "Forbidden",
      ok: false,
      accessToken: "",
    });
  }

  const user = await User.findOne({
    where: {
      _id: payload.userId,
    },
  });

  if (!user) {
    return res.status(403).send({
      code: 403,
      message: "Forbidden",
      ok: false,
      accessToken: "",
    });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.status(403).send({
      code: 403,
      message: "Forbidden",
      ok: false,
      accessToken: "",
    });
  }
  storeRefreshToken(res, createRefreshToken(user));
  return res.status(200).send({
    code: 200,
    message: "ok",
    ok: true,
    accessToken: createAccessToken(user),
  });
});

export default router;
