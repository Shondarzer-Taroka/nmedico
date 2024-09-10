// // middleware.js
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // Import the function to get the JWT token
// import { cookies } from 'next/headers';


// // Define your middleware
// export async function middleware(req) {
//   // Get the token from cookies or request headers

//   const token = await getToken({ req, secret: process.env.SECRET });
//     const token2 = cookies(req).get('next-auth.session-token')
//   console.log(token2);
  
//   // Define the path to check
// //   const url = req.nextUrl.clone();
// if (!token || token.role !== 'admin') {
// //    i want to clear sesseon
//   }


//   return NextResponse.next();
// }

// // Specify which paths the middleware applies to
// export const config = {
//   matcher: ['/dashboard/admin/:path*', '/dashboard/:path*'], // Apply middleware to dashboard routes
// };


import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Import the function to get the JWT token

// Define your middleware
export async function middleware(req) {
  // Get the token from cookies or request headers
  const token = await getToken({ req, secret: process.env.SECRET });
  
  // Clone the URL
  const url = req.nextUrl.clone();

  // If no token is found or the role is not admin, clear the cookies and redirect to login
  if (!token || token.role !== 'admin') {
    // Create a response object with redirect URL
    const response = NextResponse.redirect(new URL('/login', req.url));
    
    // Clear the session cookies
    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('next-auth.csrf-token');

    return response;
  }

  return NextResponse.next(); // Continue to the requested page if authenticated and admin
}

// Specify which paths the middleware applies to
export const config = {
  matcher: ['/dashboard/admin/:path*'], // Apply middleware to admin dashboard routes
};
