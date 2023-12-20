import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

// We can see this by opening /api/protected/access in browser
// Why is res object required here?

export const GET =
  process.env.NODE_ENV == "development"
    ? async function accessTokenAPIRoute() {
        const res = new NextResponse();
        return NextResponse.json({ accessToken: "devAccessToken" }, res);
      }
    : withApiAuthRequired(async function accessTokenAPIRoute(req) {
        const res = new NextResponse();
        const { accessToken } = await getAccessToken(req, res, {
          scopes: (process.env.AUTH0_SCOPE as string).split(" "),
        });
        return NextResponse.json({ accessToken: accessToken }, res);
      });
