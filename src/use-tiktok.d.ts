import { TiktokInfo } from './tiktok';

declare type VoidFunctionPromise = () => Promise<void>;
export declare function useTiktok(url: string, proxy?: string): {
    isFetching: boolean;
    isDownloading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | undefined;
    info: TiktokInfo | undefined;
    getAudio: VoidFunctionPromise | undefined;
    getVideo: VoidFunctionPromise | undefined;
    get: () => Promise<void>;
};
export {};
