/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';

export const handlers = [
    // Intercept "GET https://example.com/user" requests...
    http.get('/posts', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json(
            {
                id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
                title: 'foo',
                body: 'bar',
                userId: 1,
            },
            { status: 200 },
        );
    }),
    http.post('/posts', async (req: any) => {
        const { title, body, userId } = req.body;
        return HttpResponse.json(
            {
                title,
                body,
                userId,
            },
            { status: 201 },
        );
    }),
];
