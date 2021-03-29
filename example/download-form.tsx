import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { DownloadButton } from 'example/download-button'
import { useTiktok } from 'src/use-tiktok'
import { uuid } from 'example/utils'

export const DownloadForm = () => {
    const [url, setUrl] = useState('')
    const [key, setKey] = useState(uuid())
    const [shouldGetTiktok, setShouldGetTiktok] = useState(false)
    const tiktok = useTiktok(url, key, { enabled: shouldGetTiktok })

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUrl(e.target.value)
    }

    const processTiktok = () => {
        setShouldGetTiktok(true)
        setKey(uuid())
    }

    useEffect(() => {
        if (tiktok.info) {
            console.log('Tiktok info:', tiktok.info)
            // console.log('Donwloading tiktok...')
            // tiktok.getVideo().then(() => {
            //     console.log('Video downloaded')
            // })
        }
    }, [tiktok.info])

    useEffect(() => {
        if (tiktok.error) {
            console.warn('No se pudo obtener tiktok:', tiktok.error)
        }
    }, [tiktok.error])

    return (
        <form onSubmit={handleSubmit} className="downloadForm">
            <div className="downloadForm__container">
                <input type="text" value={url} onChange={handleChange} />
                <DownloadButton
                    onClick={processTiktok}
                    isFetching={tiktok.isFetching}
                    isDownloading={tiktok.isDownloading}
                />
            </div>
        </form>
    )
}
