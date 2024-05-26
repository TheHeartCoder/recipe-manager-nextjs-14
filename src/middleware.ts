import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/my-recipes(.*)',
    '/recipes(.*)'
]);

export default clerkMiddleware((auth, req) => {
    console.log(auth().userId);

    if (!auth().userId && isProtectedRoute(req)) {
        return auth().redirectToSignIn();
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
