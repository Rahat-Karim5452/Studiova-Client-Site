"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Asterisk, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { GoogleLoginButton } from "@/components/google-login-button"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { authInputClass, authLabelClass } from "@/lib/auth-form"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  // the page the user wanted before we sent them here (must be inside our site)
  const redirectParam = searchParams.get("redirect") ?? "/"
  const redirectTo =
    redirectParam.startsWith("/") && !redirectParam.startsWith("//")
      ? redirectParam
      : "/"

  const handleEmailLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
      email: string
      password: string
    }

    setLoading(true)
    const { data, error } = await authClient.signIn.email({
      ...user,
    })

    if (error || !data) {
      setLoading(false)
      toast.error(error?.message || "Invalid email or password")
      return
    }

    // the button stays busy until the next page opens
    toast.success("Logged in successfully")
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="relative">
      <div className="mb-10">
        <Logo />
      </div>

      <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
        <Asterisk className="size-4 text-brand" />
        Welcome back
      </p>

      <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-foreground">
        Sign in and get back on{" "}
        <span className="font-serif font-normal tracking-[-0.02em] text-brand italic">
          set.
        </span>
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Your bookings, listings, saved spaces and invoices live in one place.
        Use your Studiova credentials or continue with Google.
      </p>

      <form onSubmit={handleEmailLogin} className="mt-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="email" className={authLabelClass}>
              Email address
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@studio.com"
              autoComplete="email"
              className={authInputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="password" className={authLabelClass}>
                Password
              </label>
              <button
                type="button"
                onClick={() =>
                  toast.info("Password reset is not available right now.")
                }
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className={authInputClass}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="mt-6 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/80"
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight className="size-4" />}
        </Button>

        <div className="my-6 flex items-center gap-4 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          <span className="h-px flex-1 bg-border" />
          Or continue with
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleLoginButton
          callbackURL={redirectTo}
          className="h-12 w-full rounded-full border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
        />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to Studiova?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 sm:p-10 lg:p-14">
        {/* useSearchParams needs a Suspense boundary */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
