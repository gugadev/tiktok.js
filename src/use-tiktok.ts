import { useRef, useState } from 'react'

import { tiktok, TiktokInfo } from 'src/tiktok'
import { usePrevious } from 'src/use-previous'

interface State {
    isFetching: boolean
    isSuccess: boolean
    isError: boolean
    isDownloading: boolean
    error?: Error
    info?: TiktokInfo
    getVideo: () => Promise<void>
    getAudio: () => Promise<void>
}

interface Options {
    enabled?: boolean
    proxy?: string
}

const defaultOptions: Options = {
    enabled: true,
    proxy: undefined
}

export function useTiktok(url: string, key: string, options = defaultOptions) {
    const { enabled, proxy } = options
    const previousKey = usePrevious(key)
    const fetched = useRef(false)
    const [state, setState] = useState<State>({
        isFetching: false,
        isSuccess: false,
        isError: false,
        isDownloading: false,
        error: undefined,
        info: undefined,
        getVideo: () => Promise.resolve(),
        getAudio: () => Promise.resolve()
    })

    const processTiktok = () => {
        fetched.current = true
        // start fetching
        setState({
            ...state,
            isFetching: true
        })
        tiktok
            .process(url, proxy)
            .then(data => {
                // stop fetching
                setState({
                    ...state,
                    isFetching: false,
                    isSuccess: true,
                    info: data.info,
                    // wrap getAudio to use state
                    getAudio: async () => {
                        setState({
                            ...state,
                            isDownloading: true
                        })
                        await data.getAudio()
                        setState({
                            ...state,
                            isDownloading: false
                        })
                    },
                    // wrap getVideo to use state
                    getVideo: async () => {
                        setState({
                            ...state,
                            isDownloading: true
                        })
                        await data.getVideo()
                        setState({
                            ...state,
                            isDownloading: false
                        })
                    }
                })
            })
            .catch(err => {
                setState({
                    ...state,
                    isFetching: false,
                    isError: true,
                    error: err
                })
            })
    }

    const isFirstTime = enabled && !fetched.current
    const keyChanged = previousKey !== key

    if (
        enabled &&
        fetched.current &&
        keyChanged &&
        !state.isFetching &&
        !state.isDownloading
    ) {
        processTiktok()
    }
    if (isFirstTime) {
        processTiktok()
    }

    return state
}
