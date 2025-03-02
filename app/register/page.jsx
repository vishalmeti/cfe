
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-xl">
            <RegisterForm />
          </div>
        </div>
      )
}
