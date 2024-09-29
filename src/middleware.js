

// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // Import the function to get the JWT token

// // Define your middleware
// export async function middleware(req) {
//   // Get the token from cookies or request headers
//   const token = await getToken({ req, secret: process.env.SECRET });
  
//   // Clone the URL
//   const url = req.nextUrl.clone();

//   // If no token is found or the role is not admin, clear the cookies and redirect to login
//   if (!token || token.role !== 'admin') {
//     // Create a response object with redirect URL
//     const response = NextResponse.redirect(new URL('/login', req.url));
    
//     // Clear the session cookies
//     response.cookies.delete('__Secure-next-auth.session-token');
//     response.cookies.delete('next-auth.csrf-token');

//     return response;
//   }

//   return NextResponse.next(); // Continue to the requested page if authenticated and admin
// }

// // Specify which paths the middleware applies to
// export const config = {
//   matcher: ['/dashboard/admin/:path*'], // Apply middleware to admin dashboard routes
// };





// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // Import the function to get the JWT token

// export async function middleware(req) {
//   // Get the token from cookies or request headers
//   const token = await getToken({ req, secret: process.env.SECRET });
  
//   // Clone the URL
//   const url = req.nextUrl.clone();

//   // If no token is found or the role is not admin, clear the cookies and redirect to login
//   if (!token || token.role !== 'admin') {
//     // Create a response object with redirect URL
//     const response = NextResponse.redirect(new URL('/login', req.url));
    
//     // Clear the session cookies (ensure the correct path and domain are specified)
//     response.cookies.delete('__Secure-next-auth.session-token', { path: '/', domain: req.nextUrl.hostname });
//     response.cookies.delete('next-auth.csrf-token', { path: '/', domain: req.nextUrl.hostname });

//     return response;
//   }

//   return NextResponse.next(); // Continue to the requested page if authenticated and admin
// }

// // Specify which paths the middleware applies to
// export const config = {
//   matcher: ['/dashboard/admin/:path*'], // Apply middleware to admin dashboard routes
// };








// // for dev


// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; 
// export const dynamic='force-dynamic'
// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.SECRET });

//   const url = req.nextUrl.clone();

//   if (!token || token.role !== 'admin') {
//     const response = NextResponse.redirect(new URL('/login', req.url));

//     const cookieName = process.env.NODE_ENV === 'production' 
//         ? '__Secure-next-auth.session-token' 
//         : 'next-auth.session-token';

//     response.cookies.delete(cookieName);
//     response.cookies.delete('next-auth.csrf-token');

//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/admin/:path*'],
// };


// // for dev okay






// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // Import the function to get the JWT token

// export async function middleware(req) {
//   // Get the token from cookies or request headers
//   const token = await getToken({ req, secret: process.env.SECRET });

//   // Clone the URL
//   const url = req.nextUrl.clone();

//   // Check if we're in production
//   const isProd = process.env.NODE_ENV === 'production';
//   const cookieOptions = {
//     path: '/',
//     domain: req.nextUrl.hostname,
//     secure: isProd, // Set Secure in production mode
//   };

//   // If no token is found or the role is not admin, clear the cookies and redirect to login
//   if (!token || token.role !== 'admin') {
//     // Create a response object with redirect URL
//     const response = NextResponse.redirect(new URL('/login', req.url));

//     // Clear the session cookies with the correct options
//     response.cookies.delete('__Secure-next-auth.session-token', cookieOptions);
//     response.cookies.delete('next-auth.csrf-token', cookieOptions);

//     return response;
//   }

//   return NextResponse.next(); // Continue to the requested page if authenticated and admin
// }

// // Specify which paths the middleware applies to
// export const config = {
//   matcher: ['/dashboard/admin/:path*'], // Apply middleware to admin dashboard routes
// };



// // update code for middleware
  
  
  import { NextResponse } from 'next/server';
  import { getToken } from 'next-auth/jwt'; 
  
  export const dynamic = 'force-dynamic';

  export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.SECRET });
    const pathname = req.nextUrl.pathname
    console.log(pathname);
    
    const isProtectedRoute = pathname.startsWith('/categorydetails/');
    
    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page
    }

    if (pathname.includes('api')) {
        return NextResponse.next()
    }
    
    if (!token) {
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url))
    }
    
    if (!token) {
      console.log('Token not found or invalid');
    } else if (token.role !== 'admin') {
      console.log('User is not an admin');
    }
  
    // const url = req.nextUrl.clone();
  
    if (!token || token.role !== 'admin') {
      const response = NextResponse.redirect(new URL('/login', req.url));
  
      const cookieName = process.env.NODE_ENV === 'production' 
          ? '__Secure-next-auth.session-token' 
          : 'next-auth.session-token';
  
      response.cookies.delete(cookieName);
      response.cookies.delete('next-auth.csrf-token');
  
      return response;
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: ['/dashboard/admin/:path*'],
  };
