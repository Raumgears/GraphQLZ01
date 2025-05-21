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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="query" value={formData.namail} onChange={(e) => setFormData({...formData, namail: e.target.value})}/>
                <input type="password" name='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                <button type="submit">Log In</button>
            </form>
            <span>{message}</span>
        </div>
    )
}
