'use client'

import { useEffect, useRef } from 'react'

export default function AuditRatioBar(data) {

    const auditRatio = data.bars.auditRatio
    const totalUp = data.bars.totalUp
    const totalDown = data.bars.totalDown
    const svgRef = useRef(null)
    
    useEffect(() => {
        if (!svgRef.current) {
            return
        }
        const svg = svgRef.current
        const width = 600
        const height = 150
        const margin = { top: 20, right: 150, bottom: 40, left: 40 }
        
        svg.innerHTML = ''

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        g.setAttribute('transform', `translate(${margin.left},${margin.top})`)

        const maxValue = Math.max(totalUp, totalDown) || 1
        const availableWidth = width - margin.left - margin.right
        const barHeight = 20
        const gap = 30

        const createHorizontalBar = (value, yPosition, color) => {
            const barWidth = (value / maxValue) * availableWidth
            
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            bar.setAttribute('x', 0)
            bar.setAttribute('y', yPosition)
            bar.setAttribute('width', barWidth)
            bar.setAttribute('height', barHeight)
            bar.setAttribute('fill', color)
            
            const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            valueLabel.setAttribute('x', barWidth + 10)
            valueLabel.setAttribute('y', yPosition + barHeight/2)
            valueLabel.setAttribute('dominant-baseline', 'middle')
            valueLabel.textContent = value
            
            g.appendChild(bar)
            g.appendChild(valueLabel)
        }

        createHorizontalBar(totalUp, 0, '#10b981')
        createHorizontalBar(totalDown, barHeight + gap, '#ef4444')

        const ratioLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        ratioLabel.setAttribute('x', availableWidth + 50)
        ratioLabel.setAttribute('y', (barHeight * 2 + gap) / 2)
        ratioLabel.setAttribute('dominant-baseline', 'middle')
        ratioLabel.innerHTML = `Ratio : ${auditRatio.toFixed(2)}`
        g.appendChild(ratioLabel)

        svg.appendChild(g)

    }, [totalDown, totalUp, auditRatio])

    if (totalDown === 0 && totalUp === 0) {
        return (
        <div className="text-gray-500">
            No audit data available
        </div>
        )
    }

    return <svg ref={svgRef} width="600" height="150" />
}