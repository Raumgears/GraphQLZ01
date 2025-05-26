"use client"

import { useRouter } from 'next/navigation'

export default function LogOut() {
    const router = useRouter()
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        router.push('/login')    }
      
    return (
        <button
            onClick={handleLogout}
            className="fixed top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
        >
            Log Out
        </button>
    )
}
