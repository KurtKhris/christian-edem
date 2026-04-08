import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.includes("/admin/login")) {
        return token?.role === "ADMIN";
      }
      return true;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = { matcher: ["/admin/:path*"] };
