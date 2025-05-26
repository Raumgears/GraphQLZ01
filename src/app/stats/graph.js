"use client"

import { useMemo } from "react"

export default function SkillGraph(data) {
    const skillNameCut = /^s.+?_/
    const skillSorted = useMemo(() => {
        return data.skills
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 7)
        .map(skill => ({
            type: skill.type.replace(skillNameCut, ''),
            amount: skill.amount
        }))
    }, [data.skills])

    const size = 500
    const center = size / 2
    const radius = size * 0.4
    const angles = Array.from({ length: skillSorted.length }, (_, i) => 
        (i * (2 * Math.PI)) / skillSorted.length - Math.PI / 2
    )

    const getCoordinates = (amount, angle) => {
        const scaledValue = (amount / 100) * radius
        return {
            x: center + scaledValue * Math.cos(angle),
            y: center + scaledValue * Math.sin(angle)
        }
    }

    const generatePath = () => {
        const points = skillSorted.map((skill, i) => {
            const { x, y } = getCoordinates(skill.amount, angles[i])
            return `${x},${y}`
        })
        return points.length > 2 ? `M ${points.join(' L ')} Z` : ''
    }

    if (!skillSorted.length){
        return null
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Skills Distribution</h3>
            <div className="mx-auto max-w-[500px]">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {[0.2, 0.4, 0.6, 0.8, 1].map(level => (
                        <polygon
                            key={level}
                            points={angles.map(angle => {
                                const x = center + radius * level * Math.cos(angle)
                                const y = center + radius * level * Math.sin(angle)
                                return `${x},${y}`
                            }).join(' ')}
                            fill="none"
                            stroke="#eee"
                        />
                    ))}

                    {angles.map((angle, i) => {
                        const { x, y } = getCoordinates(100, angle)
                        return (
                            <line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={x}
                                y2={y}
                                stroke="#ccc"
                            />
                        )
                    })}
                    {skillSorted.map((skill, i) => {
                        const { x, y } = getCoordinates(105, angles[i])
                        return (
                            <text
                                key={skill.type}
                                x={x}
                                y={y}
                                textAnchor={x > center ? 'start' : x < center ? 'end' : 'middle'}
                                dominantBaseline="middle"
                                fontSize="12"
                            >
                                {skill.type}
                            </text>
                        )
                    })}

                    <path
                        d={generatePath()}
                        fill="rgba(0, 99, 249, 0.3)"
                        stroke="rgb(0, 99, 249"
                        strokeWidth="2"
                    />
                </svg>
            </div>
        </div>
    )
}