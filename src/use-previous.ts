import { useEffect, useRef } from 'react'

export function usePrevious<T>(prop: T) {
    const ref = useRef<T>()

    useEffect(() => {
        ref.current = prop
    }, [prop])

    return ref.current
}
