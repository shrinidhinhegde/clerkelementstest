import {clerkMiddleware, createRouteMatcher, verifyToken} from '@clerk/nextjs/server'
import {NextResponse} from "next/server";
import {ClerkOrgResponse} from "./app/_utils/interfaces";

const createOrganizationRoute = '/create-organization'
const allRoutes = createRouteMatcher(['/app(.*)'])
const adminRoutes = createRouteMatcher([`/admin(.*)`])
const apiRoutes = createRouteMatcher([`/api(.*)`])
const createOrganization = createRouteMatcher([`${createOrganizationRoute}(.*)`])

export default clerkMiddleware(async (auth, req) => {
  const org_len = async (user_id: string) => {
    const clerkAPIUrl = `https://api.clerk.com/v1/users/${user_id}/organization_memberships`;
    const res = await fetch(clerkAPIUrl, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    })
    const json: ClerkOrgResponse = await res.json()

    return json['data'].length
  }

  if (adminRoutes(req)) {
    if (auth().userId && !auth().orgId) {
      const len = await org_len(auth().userId!)
      if (len == 0) {
        return NextResponse.redirect(new URL(`${createOrganizationRoute}`, req.url))
      }
    }
    auth().protect((has) => {
      return has({role: 'org:admin'})
    })
  }

  if (allRoutes(req)) {
    if (auth().userId && !auth().orgId) {
      const len = await org_len(auth().userId!)
      if (len == 0) {
        return NextResponse.redirect(new URL(`${createOrganizationRoute}`, req.url))
      }
    }
    auth().protect()
  }

  if (apiRoutes(req)) {
    try {
      const token = req.headers.get('Authorization')?.split(' ')[1] || ''
      const verification = await verifyToken(token, {
        jwtKey: process.env.CLERK_JWT_KEY,
      })
      if (verification.sub) {
        return NextResponse.next()
      }
    } catch {
      return NextResponse.error()
    }
  }

  if (createOrganization(req)) {
    if (auth().userId) {
      const len = await org_len(auth().userId!)
      if (len != 0) {
        return NextResponse.redirect(new URL(`/app`, req.url))
      }
    }
    auth().protect()
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}