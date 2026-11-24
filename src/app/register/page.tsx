"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Asterisk, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { GoogleLoginButton } from "@/components/google-login-button"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { authInputClass, authLabelClass } from "@/lib/auth-form"

// returns an error message, or "" when the password is fine
const validatePassword = (password: string) => {
  if (password.length < 6) return "Password must be at least 6 characters"
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter"
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter"
  return ""
}

export default function RegisterPage() {
  const router = useRouter()
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
      name: string
      image: string
      email: string
      password: string
    }

    const invalid = validatePassword(user.password)
    setPasswordError(invalid)
    if (invalid) {
      toast.error(invalid)
      return
    }

    setLoading(true)
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || undefined,
    })

    if (error || !data) {
      setLoading(false)
      toast.error(error?.message || "Registration failed")
      return
    }

    // the button stays busy until the login page opens
    toast.success("Account created. Please login.")
    router.push("/login")
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 sm:p-10 lg:p-14">
        <div className="relative">
          <div className="mb-10">
            <Logo />
          </div>

          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            <Asterisk className="size-4 text-brand" />
            Join the network
          </p>

          <h1 className="mt-4 max-w-4xl font-heading text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-foreground">
            Build your studio{" "}
            <span className="font-serif font-normal tracking-[-0.02em] text-brand italic">
              shortlist.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Create a free Studiova account to reserve rooms, save favourites and
            publish your own space to the network.
          </p>

          <form onSubmit={handleEmailSignUp} className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className={authLabelClass}>
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Ava Bennett"
                  autoComplete="name"
                  className={authInputClass}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className={authLabelClass}>
                  Email
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
                <label htmlFor="password" className={authLabelClass}>
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={passwordError ? true : undefined}
                  className={authInputClass}
                  required
                />
                {passwordError ? (
                  <p role="alert" className="text-sm text-destructive">
                    {passwordError}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    At least 6 characters with an uppercase and a lowercase
                    letter.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className={authLabelClass}>
                  Photo URL <span className="normal-case">(optional)</span>
                </label>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/photo.jpg"
                  autoComplete="url"
                  className={authInputClass}
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="mt-6 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/80"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight className="size-4" />}
            </Button>

            <div className="my-6 flex items-center gap-4 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              <span className="h-px flex-1 bg-border" />
              Or continue with
              <span className="h-px flex-1 bg-border" />
            </div>

            <GoogleLoginButton className="h-12 w-full rounded-full border-border bg-background text-foreground hover:bg-muted hover:text-foreground" />

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
