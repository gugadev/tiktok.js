import fetchMock from 'jest-fetch-mock'

import { tiktok } from '../tiktok'
import { firstResponse, secondResponse } from '../__mocks__/responses'

// @ts-ignore
fetchMock.mockIf(/^https?:\/\/cors-tiktok.herokuapp.com.*$/, req => {
    if (
        req.url.endsWith(
            '/?u=https%3A%2F%2Fwww.tiktok.com%2F%40miprofefidelito%2Fvideo%2F6943296431121812742%3Fsender_device%3Dpc%26sender_web_id%3D6919253423565276677%26is_from_webapp%3Dv3%26is_copy_url%3D0'
        )
    ) {
        return {
            body: firstResponse,
            status: 200,
            headers: {
                'Content-Type': 'text/html'
            }
        }
    }
    if (
        req.url.endsWith(
            '/?u=https%3A%2F%2Fwww.tiktok.com%2F%40miprofefidelito%2Fvideo%2F6942553428203818246'
        )
    ) {
        return {
            body: secondResponse,
            status: 200,
            headers: {
                'Content-Type': 'text/html'
            }
        }
    }
    return {
        body: '<p>not found</p>',
        status: 404,
        headers: {
            'Content-Type': 'text/html'
        }
    }
})

describe('Tiktok core', () => {
    afterAll(() => {
        fetchMock.disableMocks()
    })
    it('Should get tiktok info', done => {
        const tiktokUrl =
            'https://www.tiktok.com/@miprofefidelito/video/6942553428203818246?sender_device=pc&sender_web_id=6919253423565276677&is_from_webapp=v3&is_copy_url=0'
        tiktok.process(tiktokUrl).then(({ info }) => {
            expect(info.author.username).toEqual('Mi Profe Fidelito')
            done()
        })
    })
})
