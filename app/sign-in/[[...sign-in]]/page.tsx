// import { SignIn } from "@clerk/nextjs";
import SigninForm from '@/components/SigninForm'
 
export default function Page() {
  return (
    <main className="flex p-5 md:p-20 justify-center">
      <SigninForm />
    </main>
  )
}