"use client"

export default function Audits(data) {
    const currentAudits = []
    let lastCompletedAudit = null
    const pathCut = /\/.+\//

    data.audits.forEach(audit => {
        if (audit.closureType === null) {
            currentAudits.push(audit)
        } else if (lastCompletedAudit === null) {
            lastCompletedAudit = audit
        }
    })
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-8">
            <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Last Audit Completed</h3>
            {lastCompletedAudit ? (
                <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                    lastCompletedAudit.closureType === 'succeeded' 
                        ? 'bg-blue-100 text-[#0063F9]' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {lastCompletedAudit.closureType}
                    </span>
                </div>
                <p className="font-medium text-gray-800">{lastCompletedAudit.group.captainLogin}</p>
                <p className="text-gray-600 text-sm">{lastCompletedAudit.group.path.replace(pathCut, '')}</p>
                </div>
            ) : (
                <p className="text-gray-500 py-4 text-center">Do some audits! There are none done currently.</p>
            )}
            </div>

            <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ongoing Audits <span className="text-gray-500">({currentAudits.length})</span>
            </h3>
            <div className="space-y-4">
                {currentAudits.map(audit => (
                <div 
                    key={audit.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <p className="font-medium text-gray-800">{audit.group.captainLogin}</p>
                    <p className="text-gray-600 text-sm mb-2">{audit.group?.path.replace(pathCut, '')}</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{audit.private.code}</code>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
}