interface TiktokVideoInfo {
    id: number
    height: number
    duration: number
    sizeFormat: string
    cover: string
    animatedCover: string
    likes: number
    shares: number
    comments: number
    plays: number
    title: string
    keywords: string[]
    description: string
    originalUrl: string
    downloadUrl: string
}

interface TiktokAudioInfo {
    id: number
    title: string
    coverLarge: string
    coverMedium: string
    coverSmall: string
    artist: string
    album: string
    duration: number
    url: string
}

interface TiktokAuthorInfo {
    id: number
    uniqueId: string
    username: string
    avatarLarge: string
    avatarMedium: string
    avatarSmall: string
    signature: string
    createDate: string
    isVerified: boolean
    followers: number
    followings: number
    hearts: number
    videosCount: number
    diggCount: number
}

export interface TiktokInfo {
    video: TiktokVideoInfo
    audio: TiktokAudioInfo
    author: TiktokAuthorInfo
}

export interface TiktokReturn {
    info: TiktokInfo
    getAudio: () => Promise<void>
    getVideo: () => Promise<void>
}

/**
 *  Tiktok audio and video downloader
 * @version 0.0.1
 * @author  Gustavo Gazaki <gus.garzaki@outlook.com> taking as base the work of Abdel Youni <abdelyouni@gmail.com>
 * @see     https://github.com/gugadev/tiktok.js
 */
class Tiktok {
    private bypassCorsHeaders = 'https://cors-tiktok.herokuapp.com/?u=' // Bypass CORS (Github : https://github.com/abdelyouni/cors-tiktok)
    private DATA_SCRIPT_ID = '#__NEXT_DATA__'

    private encodeUrl(str: string): string {
        return (
            encodeURIComponent(str)
                .replace('!', '%21')
                // eslint-disable-next-line @typescript-eslint/quotes
                .replace("'", '%27')
                .replace('(', '%28')
                .replace(')', '%29')
                .replace('*', '%2A')
                .replace('%20', '+')
        )
    }

    private createDownloadLink(
        downloadUrl: string,
        filename: string
    ): HTMLAnchorElement {
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = downloadUrl
        a.download = filename
        document.body.appendChild(a)
        return a
    }

    private download(url: string, id: number, format: string): Promise<void> {
        return new Promise(resolve => {
            fetch(`${this.bypassCorsHeaders}${this.encodeUrl(url)}&d=1`)
                .then(res => res.blob())
                .then(blob => {
                    const filename = `${id}.${format}`

                    resolve()

                    const downloadUrl = window.URL.createObjectURL(blob)
                    const downloadLink = this.createDownloadLink(
                        downloadUrl,
                        filename
                    )
                    downloadLink.click()
                    window.URL.revokeObjectURL(downloadUrl)
                })
        })
    }

    private async getHtmlResponse(url: string): Promise<string> {
        // masked url -> Eg. https://www.tiktok.com/@luna_the_pantera/video/6943996796519681281?
        const _url = `${this.bypassCorsHeaders}${this.encodeUrl(url)}`
        const response = await fetch(_url)
        const html = await response.text()
        return html
    }

    private parseHtml(html: string): Document {
        return new DOMParser().parseFromString(html, 'text/html')
    }

    private getLinkTag(response: string): HTMLLinkElement | null {
        const dom = this.parseHtml(response)
        return dom.querySelector('[rel="canonical"]') as HTMLLinkElement
    }

    private getTiktokInfo(json: Record<string, any>): TiktokInfo {
        const video = {
            id: json.props.pageProps.itemInfo.itemStruct.video.id,
            height: json.props.pageProps.itemInfo.itemStruct.video.height,
            duration: json.props.pageProps.itemInfo.itemStruct.video.duration,
            sizeFormat: json.props.pageProps.itemInfo.itemStruct.video.ratio,
            cover: json.props.pageProps.itemInfo.itemStruct.video.cover,
            animatedCover:
                json.props.pageProps.itemInfo.itemStruct.video.dynamicCover,
            likes: json.props.pageProps.itemInfo.itemStruct.stats.diggCount,
            shares: json.props.pageProps.itemInfo.itemStruct.stats.shareCount,
            comments:
                json.props.pageProps.itemInfo.itemStruct.stats.commentCount,
            plays: json.props.pageProps.itemInfo.itemStruct.stats.playCount,
            title: json.props.pageProps.seoProps.metaParams.title,
            keywords: json.props.pageProps.seoProps.metaParams.keywords,
            description: json.props.pageProps.seoProps.metaParams.description,
            originalUrl: json.props.pageProps.seoProps.metaParams.canonicalHref,
            downloadUrl:
                json.props.pageProps.itemInfo.itemStruct.video.downloadAddr
        }

        const audio = {
            id: json.props.pageProps.itemInfo.itemStruct.music.id,
            title: json.props.pageProps.itemInfo.itemStruct.music.title,
            coverLarge:
                json.props.pageProps.itemInfo.itemStruct.music.coverLarge,
            coverMedium:
                json.props.pageProps.itemInfo.itemStruct.music.coverMedium,
            coverSmall:
                json.props.pageProps.itemInfo.itemStruct.music.coverThumb,
            artist: json.props.pageProps.itemInfo.itemStruct.music.authorName,
            album: json.props.pageProps.itemInfo.itemStruct.music.album,
            duration: json.props.pageProps.itemInfo.itemStruct.music.duration,
            url: json.props.pageProps.itemInfo.itemStruct.music.playUrl
        }

        const author = {
            id: json.props.pageProps.itemInfo.itemStruct.author.id,
            uniqueId: json.props.pageProps.itemInfo.itemStruct.author.uniqueId,
            username: json.props.pageProps.itemInfo.itemStruct.author.nickname,
            avatarLarge:
                json.props.pageProps.itemInfo.itemStruct.author.avatarLarger,
            avatarMedium:
                json.props.pageProps.itemInfo.itemStruct.author.avatarMedium,
            avatarSmall:
                json.props.pageProps.itemInfo.itemStruct.author.avatarThumb,
            signature:
                json.props.pageProps.itemInfo.itemStruct.author.signature,
            createDate:
                json.props.pageProps.itemInfo.itemStruct.author.createTime,
            isVerified:
                json.props.pageProps.itemInfo.itemStruct.author.verified,
            followers:
                json.props.pageProps.itemInfo.itemStruct.authorStats
                    .followerCount,
            followings:
                json.props.pageProps.itemInfo.itemStruct.authorStats
                    .followingCount,
            hearts: json.props.pageProps.itemInfo.itemStruct.authorStats.heart,
            videosCount:
                json.props.pageProps.itemInfo.itemStruct.authorStats.videoCount,
            diggCount:
                json.props.pageProps.itemInfo.itemStruct.authorStats.diggCount
        }

        return {
            video,
            audio,
            author
        }
    }

    async process(url: string, proxy?: string): Promise<TiktokReturn> {
        if (proxy) {
            this.bypassCorsHeaders = proxy
        }
        // HTML page of tiktok for the video. From it we gonna take the real video url
        const tiktokHtmlResponse = await this.getHtmlResponse(url)
        const linkTagWithVideoUrl = this.getLinkTag(tiktokHtmlResponse)

        if (!linkTagWithVideoUrl) {
            throw new Error('No link tag with video info found. Aborting...')
        }

        // gets the video url from the HTML response
        const tiktokUrl = linkTagWithVideoUrl.href
        const response = await this.getHtmlResponse(tiktokUrl)
        const dom = this.parseHtml(response)
        // the info we need is in "__NEXT_DATA__" script tag.
        const dataStr = dom.querySelector(this.DATA_SCRIPT_ID)?.textContent
        const dataJson = JSON.parse(dataStr ?? '{}')
        const parsedData = this.getTiktokInfo(dataJson)

        return {
            info: parsedData,
            getVideo: (): Promise<void> => {
                return this.downloadVideo(parsedData.video)
            },
            getAudio: (): Promise<void> => {
                return this.downloadAudio(parsedData.audio)
            }
        }
    }

    private downloadAudio(audioInfo: TiktokAudioInfo): Promise<void> {
        const { id, url } = audioInfo
        return this.download(url, id, 'mp3')
    }

    private downloadVideo(videoInfo: TiktokVideoInfo): Promise<void> {
        const { id, downloadUrl } = videoInfo
        return this.download(downloadUrl, id, 'mp4')
    }
}

export const tiktok = new Tiktok()
