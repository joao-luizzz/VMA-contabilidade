import { useEffect, useState, useCallback } from 'react'

interface UseFloatingAnimationProps {
    initialX?: number
    initialY?: number
    speed?: number
    range?: number
}

export function useFloatingAnimation({
    initialX,
    initialY,
    speed = 100,
    range = 2
}: UseFloatingAnimationProps = {}) {
    const [position, setPosition] = useState({
        x: initialX ?? Math.random() * 100,
        y: initialY ?? Math.random() * 100
    })
    const [isVisible, setIsVisible] = useState(false)

    const updatePosition = useCallback(() => {
        setPosition(prev => ({
            x: Math.max(0, Math.min(100, prev.x + (Math.random() - 0.5) * range)),
            y: Math.max(0, Math.min(100, prev.y + (Math.random() - 0.5) * range))
        }))
    }, [range])

    useEffect(() => {
        setIsVisible(true)
        const interval = setInterval(updatePosition, speed)

        return () => clearInterval(interval)
    }, [updatePosition, speed])

    return { position, isVisible }
}