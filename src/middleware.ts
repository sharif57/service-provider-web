import { NextResponse } from "next/server";
import { getCurrentUser } from "./service/authService";

export async function middleware(request: Request) {
  // Fetch current user (authentication token)
  const token = await getCurrentUser();

  // If there's no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is authenticated, proceed with the request
  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
  matcher: ["/dashboard", "/dashboard/:page","/my-profile","/edit-profile"],
};
// import { NextResponse } from "next/server";
// import { getCurrentUser } from "./service/authService";

// export async function middleware(request: Request) {
//   const token = await getCurrentUser();

//   // Allow pages to load; client will handle modal for unauthenticated users
//   if (!token) {
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard", "/dashboard/:page", "/calendar", "/offers", '/settings' ,'/settings/:page'],
// };
        