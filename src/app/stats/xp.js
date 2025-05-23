"use client"

export default function Xp(data) {
    const pathCut = /\/.+\//
    
    return (
        <div>
             <div>
                <h3>Last 10 XP changes :</h3>
                {data.xp.length > 0 ? (
                    data.xp.map(transac => (
                        <div key={transac.id}>
                            <p>Date: {transac.createdAt}</p>
                            <p>Project: {transac.path.replace(pathCut, '')}</p>
                            <p>Amount : {transac.amount}</p>
                        </div>
                    ))
                ) : (
                    <p>No XP gains</p>
                )}
            </div>
        </div>
    )
}