import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSession(handler: any) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
