import { CustomeRequest } from '@types'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: CustomeRequest) {
    console.log('first middleware')
    const baseUrl = request.nextUrl.origin
    const authHeader = request && request?.headers?.get('Authorization');
    console.log('auth header is', authHeader?.split(' ')[1].slice(0, 10))
    if (authHeader) { 
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = await fetch(baseUrl+'/api/verifyToken', {method: 'POST', body: JSON.stringify(token)})
                .then(res => res.json() )
                .then(data => data)
                .catch(err => console.error(err))
            request.admin = decodedToken.adminId; 
            console.log('decoded token', decodedToken)
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    // Check if the request is from an admin
    if (!request.admin) {
        return NextResponse.redirect(new URL('/api/unauthorized', request.url),{headers:{'targetUrl':request.url, 'method': request.method}});
    }

    console.log(request.admin, 'is the admin')
    const response = NextResponse.next();
    response.headers.set('x-admin-id', request.admin); // Set custom header with admin information
    return response;
}

export const config = {
    matcher: ["/api/schemes/:path*","/api/participants/add/:path*", "/api/superadmin/:path*"],
};


