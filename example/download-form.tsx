import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { DownloadButton } from 'example/download-button'
import { useTiktok } from 'src/use-tiktok'

export const DownloadForm = () => {
    const [url, setUrl] = useState('')
    const tiktok = useTiktok(url)

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUrl(e.target.value)
    }

    const download = () => {
        if (tiktok.getVideo) {
            tiktok.getVideo().then(() => {
                console.log('Video downloaded')
            })
        }
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
            console.warn(
                'Something went wrong when fetch the tiktok:',
                tiktok.error
            )
        }
    }, [tiktok.error])

    return (
        <form onSubmit={handleSubmit} className="downloadForm">
            <div className="downloadForm__container">
                <input type="text" value={url} onChange={handleChange} />
                <DownloadButton
                    onClick={tiktok.isSuccess ? download : tiktok.get}
                    isFetching={tiktok.isFetching}
                    isDownloading={tiktok.isDownloading}
                    isSuccess={tiktok.isSuccess}
                    isFormEmpty={url.length === 0}
                />
            </div>
        </form>
    )
}
