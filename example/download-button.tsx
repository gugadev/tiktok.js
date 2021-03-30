/* eslint-disable react/button-has-type */
import React, { HTMLProps, FC } from 'react'

interface ButtonProps extends Exclude<HTMLProps<HTMLButtonElement>, 'type'> {
    type?: string
    isFetching: boolean
    isDownloading: boolean
    isSuccess: boolean
    isFormEmpty: boolean
}

export const DownloadButton: FC<ButtonProps> = ({
    isFormEmpty,
    isFetching,
    isDownloading,
    isSuccess,
    type = 'button',
    ...props
}) => {
    const className =
        'px-6 py-3 rounded-md font-semibold bg-blue-600 text-white disabled:opacity-50'
    if (isFetching) {
        return (
            <button
                className={className}
                disabled
                {...props}
                type={type as any}
            >
                Fetching...
            </button>
        )
    }
    if (isDownloading) {
        return (
            <button
                className={className}
                disabled
                {...props}
                type={type as any}
            >
                Downloading...
            </button>
        )
    }
    if (isSuccess) {
        return (
            <button className={className} {...props} type={type as never}>
                Download
            </button>
        )
    }
    return (
        <button
            className={className}
            disabled={isFormEmpty}
            {...props}
            type={type as never}
        >
            Get
        </button>
    )
}
