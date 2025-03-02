'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { constants } from "@/constants"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import UserService from "@/services/userService"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}) {
  const APP_NAME = constants.APP_NAME
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();


  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
    const token = localStorage.getItem('token');
    if (token
      && token !== 'undefined'
      && token !== 'null') {
      router.push('/dashboard');
    }

  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginPromise = UserService.login({
        username: email, password
      });

      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'))
        }, 5000)
      }
      );

      const responsePromise = Promise.race([loginPromise, timeoutPromise]);

      toast.promise(
        responsePromise,
        {
          loading: "Logging in...",
          success: "Logged in!",
          error: "Invalid credentials / Request timed out",
        }
      );
      const resp = await responsePromise;
      // store the token in local storage
      localStorage.setItem('token', resp.access);
      // redirect to the dashboard
      if (resp.access) {
        router.push('/dashboard');
      }

      // window.location.href = '/dashboard';
    } catch (error) {

    }

  };

  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com"
            onChange={handleEmailChange}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" onChange={handlePasswordChange} />
        </div>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Login
        </Button>
        {/* <div
          className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor" />
          </svg>
          Login with GitHub
        </Button> */}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4">
          Register
        </a>
      </div>
    </form>)
  );
}
