import { FC, HTMLProps } from 'react';
interface ButtonProps extends Exclude<HTMLProps<HTMLButtonElement>, 'type'> {
    type?: string;
    isFetching: boolean;
    isDownloading: boolean;
}
export declare const DownloadButton: FC<ButtonProps>;
export {};
