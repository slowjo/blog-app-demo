'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { revalidatePathFromClient } from "@/app/actions"

export default function SignupForm() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleUsernameChange = (e : ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e : ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isLoaded) {
            return
        }

        try {
            const result = await signIn.create({
                identifier: username,
                password: password, 
            })

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId })
                await revalidatePathFromClient()
                router.push('/')
            } else {
                console.log(result)
            }
            
        } catch(error : any) {
            console.log('error:', error.errors[0].longMessage)
            setMessage(error.errors[0].longMessage)
        }
    }

    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your username" required />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full mb-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">{message}</p>
                  </div>
                  <button type="submit" className="w-full text-gray-900 bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don&apos;t have an account? <Link href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
    )
}