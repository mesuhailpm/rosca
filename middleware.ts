import { CustomeRequest } from '@types'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: CustomeRequest) {
    const baseUrl = request.nextUrl.origin
    const authHeader = request && request?.headers?.get('Authorization');
    console.log(authHeader, ' is auth header inside the middlware')
    if (authHeader) { 
        const token = authHeader.split(' ')[1];
        try {
            console.log(baseUrl+'/api/verifyToken', ' is the url used to verifyt the token')
            const decodedToken = await fetch(baseUrl+'/api/verifyToken', {method: 'POST', body: JSON.stringify(token)})
                .then(res => res.json() )
                .then(data => data)
                .catch(err => console.error(err))
            request.admin = decodedToken.adminId; 
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    // Check if the request is from an admin
    if (!request.admin) {
        return NextResponse.redirect(new URL('/api/unauthorized', request.url),{headers:{'targetUrl':request.url, 'method': request.method}});
    }

    const response = NextResponse.next();
    response.headers.set('x-admin-id', request.admin); // Set custom header with admin information
    return response;
}

export const config = {
    matcher: ["/api/schemes/:path*","/api/participants/add/:path*", "/api/superadmin/:path*"],
};


