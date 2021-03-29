# tiktok.js

Get tiktok's info (music, video, author) and download audio and video!

## Install (not published atm)

```bsah
npm install @gugadev/tiktok.js
```

## How to use

There are two main use cases: using the core library and using the react hook.

### Using the core library

The core library is responsible of all tiktok operations: get tiktok info like video and audio stuff as well author full data.

Just import the library and execute ´process´ method:

````typescript
import { tiktok } from '@gugadev/tiktok.js'

tiktok.process('<video url>').then(data => {
    
})
````

The value resolved by the promise is an object containing the following fields:

- `info`: object containing `audio`, `video` and `author` objects.
- `getAudio`: function that downloads the audio of the video. Returns a promise.
- `getVideo`: function that downloads the video. Returns a promise.

Aditionally, there is a second argument for `process` method:

````typescript
import { tiktok } from '@gugadev/tiktok.js'

tiktok.process('<video url>', '<proxy url>').then(data => {
    
})
````

The proxy url is a url of some server acting as proxy between the web browser and tiktok server to avoid CORS policy.

### Using the react library.

For react users there is a hook built in. This hook accept three arguments:

- url of the tiktok.
- identifier: acts as a key. If the key changes, the request will be fired again.
- otpions:
    - proxy: proxy server or undefined.
    - enabled: flag that indicates if the request could be done.

````typescript
import { useTiktok } from '@gugadev/tiktok.js'

export const App = () => {
    const [url, setUrl] = useState('')
    const [key, setKey] = useState(uuid())
    const [shouldGetTiktok, setShouldGetTiktok] = useState(false)
    const tiktok = useTiktok(url, key, { enabled: shouldGetTiktok })

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
            //      // video will be downloaded automatically
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
        <div className="downloadForm">
            <div className="downloadForm__container">
                <input
                    type="text"
                    value={url}
                    onChange={handleChange}
                />
                <DownloadButton
                    onClick={processTiktok}
                    isFetching={tiktok.isFetching}
                    isDownloading={tiktok.isDownloading}
                />
            </div>
        </div>
    )
}
````

The hook return an object with the following fields:

- `info`: same as core library.
- `getAudio`: same as core library.
- `getVideo`: same as core library.
- `isFetching`: if the tiktok is fetching.
- `isSuccess`: if the tiktok is fetched.
- `isError`: if the tiktok failed.
- `isDownloading`: if the tiktok is downloading (audio or video).
- `error`: error in fail case.
