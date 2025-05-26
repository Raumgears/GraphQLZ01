"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        namail: '',
        password: '',
    })
    const [message, setMessage] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let token
        try {
            const response = await fetch("https://zone01normandie.org/api/auth/signin", {
                method: "POST",
                headers: {
                    Authorization: 'Basic ' + btoa(`${formData.namail}:${formData.password}`)
                }
            })

            if (!response.ok) {
                throw new Error('Échec de la connexion')
            }

            token = await response.json()
            console.log(token)
            localStorage.setItem('token', token)
            router.push('/stats')
        
        } catch (error) {
            console.error("Erreur:", error.message)
            setMessage('Invalid Credentials')
        }
    }

    return (
        <div className="w-screen h-screen grid place-items-center bg-[#212529] p-5">
            <div className="grid w-full max-w-md bg-white rounded-xl shadow-xl p-10 md:p-12 gap-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            name="query" 
                            placeholder="Email or Username"
                            value={formData.namail} 
                            onChange={(e) => setFormData({...formData, namail: e.target.value})}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea] focus:ring-opacity-30 transition-all"
                        />
                        <input 
                            type="password" 
                            name='password' 
                            placeholder="Password"
                            value={formData.password} 
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea] focus:ring-opacity-30 transition-all"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-[#0063F9] text-white rounded-lg font-semibold hover:bg-[#] transition-colors"
                    >
                        Submit Login
                    </button>
                </form>
                <p className="text-center text-red-600 mt-4 min-h-[1.2em]">{message}</p>
            </div>
        </div>
    )
}
