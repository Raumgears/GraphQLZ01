"use client"

export default function Xp(data) {
    const pathCut = /\/.+\//

    const formatDate = (isoDate) => {
        try {
            const date = new Date(isoDate)
            const options = {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }
            
            return date.toLocaleDateString('en-GB', {
                ...options,
                month: 'short'
            }).replace(',', ' at')
        } catch (e) {
            return 'Date inconnue'
        }
    }
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Last 10 XP changes</h3>
            <div className="space-y-4">
            {data.xp.length > 0 ? (
                data.xp.map(transac => (
                <div 
                    key={transac.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-600 text-sm">{formatDate(transac.createdAt)}</span>
                    <span className={`text-sm font-medium ${
                                    transac.amount > 0 
                                        ? 'bg-blue-100 text-[#0063F9]' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                        {transac.amount > 0 ? `+${transac.amount}` : transac.amount}
                    </span>
                    </div>
                    <p className="text-gray-800 font-medium">
                    {transac.path.replace(pathCut, '')}
                    </p>
                </div>
                ))
            ) : (
                <p className="text-gray-500 text-center py-4">No XP gains</p>
            )}
            </div>
        </div>
    )
}