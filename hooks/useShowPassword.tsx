'use client'

import { useState } from "react"


export default function useShowPassword() {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPasswordClick = () : void => {
        setShowPassword((prev) => !prev)
    }

    return ({
        showPassword,
        handleShowPasswordClick,
    })
}