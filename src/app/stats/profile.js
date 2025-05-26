"use client"

export default function Profile(data) {
    const login = data.profile.login
    const email = data.profile.email
    const fn = data.profile.firstName
    const ln = data.profile.lastName
    const campus = data.profile.campus

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome back {login}!</h1>
            <div className="space-y-2">
            <p className="flex gap-2">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{fn} {ln}</span>
            </p>
            <p className="flex gap-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800 break-all">{email}</span>
            </p>
            <p className="flex gap-2">
                <span className="font-medium text-gray-600">Campus:</span>
                <span className="text-gray-800">{campus}</span>
            </p>
            </div>
        </div>
    )
}