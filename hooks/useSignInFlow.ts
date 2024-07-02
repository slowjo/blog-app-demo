import { ChangeEvent, FormEvent, useState } from "react"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { revalidatePathFromClient } from "@/app/actions"
import useShowPassword from "@/hooks/useShowPassword"


export default function useSignInFlow() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { showPassword, handleShowPasswordClick } = useShowPassword()

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
            setLoading(true)
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

            setLoading(false)
            
        } catch(error : any) {
            console.log('error:', error.errors[0].longMessage)
            setMessage(error.errors[0].longMessage)
            setLoading(false)
        }
    }

    return ({
        username,
        password,
        message,
        loading,
        showPassword,
        handleShowPasswordClick,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
    })
}