"use client"

import { useState ,useEffect } from "react"
import { useRouter } from "next/navigation.js"
import Header from "./header.js"
import { graphQLFetch } from "@/src/fetch/graphQL.js"

export default function Stats() {
    const router = useRouter()
    const [data, setData] = useState(null)
    useEffect(() => {
        let JWT = localStorage.getItem("token")
        if (!JWT) {
            router.push('/login')
        }
        graphQLFetch(JWT).then(fetchedData => {
            setData(fetchedData)
            console.log(fetchedData)
        }).catch(error => {
            console.error('Erreur fetch :', error)
        })
    }, [router])
    return (
        <Header></Header>
    )
}