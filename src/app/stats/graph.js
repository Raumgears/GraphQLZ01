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
        const maxValue = Math.max(...skillSorted.map(s => s.amount)) || 1
        const scaledValue = (amount / maxValue) * radius
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
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Grille de fond */}
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

            {/* Axes */}
            {angles.map((angle, i) => {
                const { x, y } = getCoordinates(skillSorted[i].amount, angle)
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

            <path
                d={generatePath()}
                fill="rgba(100, 150, 250, 0.3)"
                stroke="rgb(100, 150, 250)"
                strokeWidth="2"
            />
            {skillSorted.map((skill, i) => {
                const { x, y } = getCoordinates(skill.amount * 1.1, angles[i])
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
        </svg>
    )
}
  /*   const allSum = data.points.aggregate.sum.amount
    const allPoint = data.points.nodes
    let curSum = 0

    const epoch = Number(new Date(allPoint[0].createdAt))
    const maxTime = Number(Date.now()) - epoch

    let pathString = "M 0 500 "

    allPoint.forEach( point => {  
        curSum += point.amount
        let corX = ((Number(new Date(point.createdAt)) - epoch) / maxTime).toFixed(3) * 700
        let corY = 500 - Number(curSum / allSum).toFixed(3) * 500
        pathString += `H ${corX} V ${corY} `
    })
    pathString += `H 700`

    return (
        <svg viewBox="0 0 705 505">
            <path d={pathString} fill="transparent" stroke="blue" strokeWidth="1px"/>
        </svg>
    ) */
