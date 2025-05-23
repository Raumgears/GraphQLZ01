"use client"

import { useState ,useEffect } from "react"
import { useRouter } from "next/navigation.js"
import Header from "./header.js"
import { graphQLFetch } from "@/src/fetch/graphQL.js"
import AuditRatioBar from "./bars.js"
import Profile from "./profile.js"
import Audits from "./audit.js"
import Xp from "./xp.js"
import SkillGraph from "./graph.js"

export default function Stats() {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
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
        setLoading(false)
    }, [router])
    
    if (loading) {
        return (
            <div>
                <Header />
                <div className="text-center py-8">Loading...</div>
            </div>
        )
    }

    if (!data) {
        return (
            <div>
                <Header />
                <div className="text-center py-8">No data available</div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <Profile profile={data.data.user[0]} />
            <Audits audits={data.data.user[0].audits}/>
            <Xp xp={data.data.user[0].xp} />
            <AuditRatioBar bars={data.data.user[0]} />
            <SkillGraph skills={data.data.user[0].skills} />
        </div>
    )
}
