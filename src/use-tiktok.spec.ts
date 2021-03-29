import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'

import { useTiktok } from './use-tiktok'

describe('useTiktok hook', () => {
    beforeAll(() => {
        nock('https://cors-tiktok.herokuapp.com')
            .get(
                '/?u=https%3A%2F%2Fwww.tiktok.com%2F%40miprofefidelito%2Fvideo%2F6943296431121812742%3Fsender_device%3Dpc%26sender_web_id%3D6919253423565276677%26is_from_webapp%3Dv3%26is_copy_url%3D0'
            )
            .reply(200, '')

        nock('https://cors-tiktok.herokuapp.com')
            .get(
                '/?u=https%3A%2F%2Fwww.tiktok.com%2F%40miprofefidelito%2Fvideo%2F6942553428203818246'
            )
            .reply(200, '')
    })

    it('Should do anything because enabled flag', () => {
        const tiktokUrl =
            'https://www.tiktok.com/@miprofefidelito/video/6942553428203818246?sender_device=pc&sender_web_id=6919253423565276677&is_from_webapp=v3&is_copy_url=0'
        const { result } = renderHook(() =>
            useTiktok(tiktokUrl, 'somekey', { enabled: false })
        )

        expect(result.current.info).toBeUndefined()
    })
})
