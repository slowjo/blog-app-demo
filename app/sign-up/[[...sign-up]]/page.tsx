// import { SignUp } from "@clerk/nextjs";
import SignupForm from "@/components/SignupForm";
 
export default function Page() {
  return (
    <main className="flex p-5 md:p-20 justify-center">
      <SignupForm />
    </main>
  ) 
}