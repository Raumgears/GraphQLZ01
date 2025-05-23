"use client"

export default function Profile(data) {
    const login = data.profile.login
    const email = data.profile.email
    const fn = data.profile.firstName
    const ln = data.profile.lastName
    const campus = data.profile.campus

    return (
        <div>
            <h1>Welcome back {login}</h1>
            <p><strong>Name : </strong>{fn} {ln}</p>
            <p><strong>Email : </strong>{email}</p>
            <p><strong>Studying at campus : </strong>{campus}</p>
        </div>
    )
}