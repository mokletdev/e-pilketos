import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

const adminPage = [
  "/admin",
  "/admin/dashboard",
  "/admin/candidates",
  "/admin/hasilVote",
  "/admin/liveCount",
];

const authPage = ["/auth/login"];

function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token) {
      if (authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else if (adminPage.includes(pathname) && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/AccessDenied", req.url));
      }
    } else if (requireAuth.includes(pathname)) {
      if (!authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    }

    return middleware(req, next);
  };
}

export default withAuth(mainMiddleware, [
  "/admin",
  "/admin/dashboard",
  "/admin/candidates",
  "/admin/hasilVote",
  "/admin/liveCount",
  "/auth/login",
]);
