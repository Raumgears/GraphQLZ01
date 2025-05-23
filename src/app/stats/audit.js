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
        <div>
            <div>
                {lastCompletedAudit ? (
                    <div key={lastCompletedAudit.id}>
                        <h3>Last audit completed :</h3>
                        <p>Auditee: {lastCompletedAudit.group.captainLogin}</p>
                        <p>Project: {lastCompletedAudit.group.path.replace(pathCut, '')}</p>
                        <p>Type: {lastCompletedAudit.closureType}</p>
                    </div>
                ) : (
                    <p>Do some audits! There are none done currently.</p>
                )}
            </div>
            <div>
                <h3>Audits ongoing ({currentAudits.length}) :</h3>
                {currentAudits.length > 0 ? (
                    currentAudits.map(audit => (
                        <div key={audit.id}>
                            <p>Auditee: {audit.group.captainLogin}</p>
                            <p>Project: {audit.group?.path.replace(pathCut, '')}</p>
                            <p>Code : {audit.private.code}</p>
                        </div>
                    ))
                ) : (
                    <p>No audits ongoing needs you !</p>
                )}
            </div>
        </div>
    )
}