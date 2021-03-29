import { useState } from 'react'

import { tiktok, TiktokInfo } from 'src/tiktok'

type VoidFunctionPromise = () => Promise<void>
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

export function useTiktok(url: string, proxy?: string) {
    // statuses
    const [isFetching, setIsFetching] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    // error
    const [error, setError] = useState<Error>()
    // info
    const [info, setInfo] = useState<TiktokInfo>()
    // methods
    const [getVideo, setGetVideo] = useState<VoidFunctionPromise>()
    const [getAudio, setGetAudio] = useState<VoidFunctionPromise>()

    /**
     * Process the tiktok video thorugh core library
     */
    const processTiktok = async () => {
        // eslint-disable-next-line prettier/prettier
        setIsFetching(true)
        try {
            const data = await tiktok.process(url, proxy)

            const _getAudio = async () => {
                setIsDownloading(true)
                await data.getAudio()
                setIsDownloading(false)
            }

            const _getVideo = async () => {
                setIsDownloading(true)
                await data.getVideo()
                setIsDownloading(false)
            }

            setGetAudio(() => _getAudio)
            setGetVideo(() => _getVideo)
            setInfo(data.info)
            setIsFetching(false)
            setIsSuccess(true)
        } catch (e) {
            setIsFetching(false)
            setIsError(true)
            setError(e)
        }
    }

    return {
        isFetching,
        isDownloading,
        isSuccess,
        isError,
        error,
        info,
        getAudio,
        getVideo,
        get: processTiktok
    }
}
