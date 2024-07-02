'use client'

import useSignUpFlow from '@/hooks/useSignUpFlow'
import Link from "next/link"
import LoadingSpinnerIcon from '@/components/LoadingSpinnerIcon'

export default function SignupForm() {
    const { handlePasswordChange, handleShowPasswordClick, handleSubmit, handleUsernameChange, loading, message, password, showPassword, username } = useSignUpFlow()

    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your username" required />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={handlePasswordChange} placeholder={showPassword ? "your password" : "••••••••"} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full mb-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        <label htmlFor="toggle-password-visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-pointer">
                        {showPassword ? "hide" : "show"}
                        </label>
                        <input type="checkbox" name="toggle-password-visibility" id="toggle-password-visibility" checked={showPassword} onClick={handleShowPasswordClick} className="absolute opacity-0" />
                      </div>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">{message}</p>
                  </div>
                  <button type="submit" className="w-full text-gray-900 bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading && <LoadingSpinnerIcon />}Sign up</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link href="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                  </p>
              </form>
          </div>
      </div>
    )
}