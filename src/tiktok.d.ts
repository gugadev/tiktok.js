interface TiktokVideoInfo {
    id: number;
    height: number;
    duration: number;
    sizeFormat: string;
    cover: string;
    animatedCover: string;
    likes: number;
    shares: number;
    comments: number;
    plays: number;
    title: string;
    keywords: string[];
    description: string;
    originalUrl: string;
    downloadUrl: string;
}
interface TiktokAudioInfo {
    id: number;
    title: string;
    coverLarge: string;
    coverMedium: string;
    coverSmall: string;
    artist: string;
    album: string;
    duration: number;
    url: string;
}
interface TiktokAuthorInfo {
    id: number;
    uniqueId: string;
    username: string;
    avatarLarge: string;
    avatarMedium: string;
    avatarSmall: string;
    signature: string;
    createDate: string;
    isVerified: boolean;
    followers: number;
    followings: number;
    hearts: number;
    videosCount: number;
    diggCount: number;
}
export interface TiktokInfo {
    video: TiktokVideoInfo;
    audio: TiktokAudioInfo;
    author: TiktokAuthorInfo;
}
export interface TiktokReturn {
    info: TiktokInfo;
    getAudio: () => Promise<void>;
    getVideo: () => Promise<void>;
}
declare class Tiktok {
    private bypassCorsHeaders;
    private DATA_SCRIPT_ID;
    private encodeUrl;
    private createDownloadLink;
    private download;
    private getHtmlResponse;
    private parseHtml;
    private getLinkTag;
    private getTiktokInfo;
    process(url: string, proxy?: string): Promise<TiktokReturn>;
    private downloadAudio;
    private downloadVideo;
}
export declare const tiktok: Tiktok;
export {};
