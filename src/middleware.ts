import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, getToken } = await auth();
  const isProtected = isProtectedRoute(req);

  if (!userId && isProtected) {
    return (await auth()).redirectToSignIn();
  }

  // Fetch user metadata if user is signed in and route is protected
  if (userId && isProtected) {
    const token = await getToken();
    const userResponse = await fetch(
      `https://api.clerk.dev/v1/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const user = await userResponse.json();

    // Check if user is admin
    if (!user.public_metadata?.isAdmin) {
      return new Response("Unauthorized", { status: 403 });
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
