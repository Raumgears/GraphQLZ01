"use client"

import { useRouter } from 'next/navigation'

export default function Headers() {
    const router = useRouter()
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        router.push('/login')    }
      
    return (
        <header>
            <button onClick={handleLogout}>Log Out</button>
        </header>
    )
}
