/* eslint-disable react/button-has-type */
import React, { FC, HTMLProps } from 'react'

interface ButtonProps extends Exclude<HTMLProps<HTMLButtonElement>, 'type'> {
    type?: string;
    isFetching: boolean;
    isDownloading: boolean;
}

export const DownloadButton: FC<ButtonProps> = ({
    isFetching,
    isDownloading,
    type = 'button',
    ...props
}) => {
    if (isFetching) {
        return (
            <button disabled {...props} type={type as any}>
                Fetching...
            </button>
        )
    }
    if (isDownloading) {
        return (
            <button disabled {...props} type={type as any}>
                Downloading...
            </button>
        )
    }
    return (
        <button {...props} type={type as any}>
            Download
        </button>
    )
}
