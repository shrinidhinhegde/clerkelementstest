'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Link from 'next/link'
import { Card, CardFooter, CardDescription, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import {LoaderCircle} from "lucide-react";
import {Label} from "@/app/_components/ui/label";
import {Input} from "@/app/_components/ui/input";
import {cn} from "@/app/_lib/utils";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full grow items-center px-4 justify-center">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Create your CRUX App account</CardTitle>
                    <CardDescription>
                      Welcome! Please fill in the details to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <Clerk.Field name="firstName" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>First name</Label>
                      </Clerk.Label>
                      <Clerk.Input type="text" required asChild>
                        <Input/>
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive"/>
                    </Clerk.Field>
                    <Clerk.Field name="lastName" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Last name</Label>
                      </Clerk.Label>
                      <Clerk.Input type="text" required asChild>
                        <Input/>
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive"/>
                    </Clerk.Field>
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input/>
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive"/>
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input/>
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive"/>
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Captcha className="empty:hidden"/>
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <LoaderCircle className="size-4 animate-spin"/>
                              ) : (
                                'Continue'
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                      <Button variant="link" size="sm" asChild>
                        <Link href="/sign-in">Already have an account? Sign in</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Verify your email</CardTitle>
                      <CardDescription>
                        Use the verification link sent to your email address
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <div className="grid items-center justify-center gap-y-2">
                        <Clerk.Field name="code" className="space-y-2">
                          <Clerk.Label className="sr-only">Email address</Clerk.Label>
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              className="flex justify-center has-[:disabled]:opacity-50"
                              autoSubmit
                              render={({value, status}) => {
                                return (
                                  <div
                                    data-status={status}
                                    className={cn(
                                      'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                                      {
                                        'z-10 ring-2 ring-ring ring-offset-background':
                                          status === 'cursor' || status === 'selected',
                                      },
                                    )}
                                  >
                                    {value}
                                    {status === 'cursor' && (
                                      <div
                                        className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                        <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000"/>
                                      </div>
                                    )}
                                  </div>
                                )
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-center text-sm text-destructive"/>
                        </Clerk.Field>
                        <SignUp.Action
                          asChild
                          resend
                          className="text-muted-foreground"
                          fallback={({resendableAfter}) => (
                            <Button variant="link" size="sm" disabled>
                              Didn&apos;t receive a code? Resend (
                              <span className="tabular-nums">{resendableAfter}</span>)
                            </Button>
                          )}
                        >
                          <Button type="button" variant="link" size="sm">
                            Didn&apos;t receive a code? Resend
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <LoaderCircle className="size-4 animate-spin"/>
                                ) : (
                                  'Verify'
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  )
}