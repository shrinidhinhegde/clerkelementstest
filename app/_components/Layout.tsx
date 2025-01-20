"use client"
import Link from "next/link"
import {
  Menu,
  Package2,
} from "lucide-react"
import {OrganizationSwitcher, SignedIn, UserButton, useUser} from "@clerk/nextjs";
import {sideNavItems} from "@/app/_utils/sideNavItems";
import {usePathname} from "next/navigation";
import {Badge} from "@/app/_components/ui/badge";
import {Button} from "@/app/_components/ui/button";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/app/_components/ui/sheet";


export default function Layout({children}: { children: React.ReactNode }) {
  const pathname = usePathname()
  const user = useUser()
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex sticky top-0 h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6"/>
              <span className="">CRUX App</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {sideNavItems.map((item) => {
                const IconComp = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${item.href === pathname ? "bg-muted" : ""} text-muted-foreground transition-all hover:text-primary`}
                  >
                    <IconComp className="h-4 w-4"/>
                    {item.title}
                    {item.badge && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <SignedIn>
              <div className="flex gap-4 items-center justify-between">
                <UserButton/>
                <OrganizationSwitcher
                  hidePersonal={true}
                  hideSlug={true}
                  createOrganizationUrl=''
                  organizationProfileUrl=''/>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header
          className="flex sticky top-0 h-14 justify-between items-center gap-4 border-b bg-muted px-4 lg:h-[0px] lg:px-6">
          <Sheet>
            <SheetTitle className="hidden">Menu</SheetTitle>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/app"
                  className="flex items-center gap-2 text-lg font-semibold border-b pb-4"
                >
                  <Package2 className="h-6 w-6"/>
                  <span className="">CRUX App</span>
                </Link>
                {sideNavItems.map((item) => {
                  const IconComp = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl ${item.href === pathname ? "bg-muted" : ""} px-3 py-2 text-foreground hover:text-foreground`}
                    >
                      <IconComp className="h-5 w-5"/>
                      {item.title}
                      {item.badge && (
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-auto border-t pt-4">
                <SignedIn>
                  <div className="flex gap-4 items-center">
                    <UserButton/>
                    <p className="text-md font-semibold text-muted-foreground">{user.user?.fullName}</p>
                  </div>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        {children}
      </div>
    </div>
  )
}