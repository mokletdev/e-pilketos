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

function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (pathname.includes("/LiveCount2Kandidat")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/AccessDenied", req.url));
      } else if (!token) {
        return NextResponse.redirect(new URL("/AccessDenied", req.url));
      }
    }

    if (token) {
      if (pathname.includes("/auth/login")) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else if (pathname.includes("/admin") && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/AccessDenied", req.url));
      }
    } else if (requireAuth.includes(pathname)) {
      if (!pathname.includes("/auth/login")) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
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
  "/admin/users",
  "/admin/votesesion",
  "/auth/login",
]);
