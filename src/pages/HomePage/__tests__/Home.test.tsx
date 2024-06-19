import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import Home from '../HomePage.page';
import { server } from '@/mocks/server';
import { HttpResponse, http } from 'msw';

describe('ErrorMessage', () => {
    it('Buttons renders correctly', () => {
        render(<Home />);
        expect(screen.getByText('Create')).toBeInTheDocument();
        expect(screen.getByText('Update')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('GET API success scenario on load', async () => {
        server.use(
            http.get('https://jsonplaceholder.typicode.com/posts', () => {
                return new HttpResponse(
                    JSON.stringify([
                        {
                            id: 1,
                            title: 'foo',
                            body: 'bar',
                            userId: 1,
                        },
                        {
                            id: 12,
                            title: 'foo2',
                            body: 'bar2',
                            userId: 1,
                        },
                    ]),
                    { status: 200 },
                );
            }),
        );
        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText('Total Items : 2')).toBeInTheDocument();
        });
    });

    it('GET API error scenario', async () => {
        render(<Home />);
        server.use(
            http.get('https://jsonplaceholder.typicode.com/posts', () => {
                return new HttpResponse(null, { status: 401 });
            }),
        );
        expect(await screen.findByText('Total Items : 0')).toBeInTheDocument();
    });

    it('UPDATE API success scenario on load', async () => {
        render(<Home />);
        server.use(
            http.post('https://jsonplaceholder.typicode.com/posts', () => {
                return new HttpResponse(
                    JSON.stringify({
                        title: 'foo1',
                        body: 'bar',
                        userId: 1,
                    }),
                    { status: 200 },
                );
            }),
        );
        await waitFor(() => screen.getByText('Total Items : 100'), { timeout: 5000 });
        expect(await screen.getByText('Total Items : 100')).toBeInTheDocument();
    });

    it('CREATE api on button click', async () => {
        render(<Home />);
        userEvent.click(screen.getByText('Create'));
        await waitFor(() => screen.getByText('Total Items : 101'), { timeout: 5000 });
    });

    it('UPDATE api on button click', async () => {
        render(<Home />);
        userEvent.click(screen.getByText('Update'));
        server.use(
            http.post('https://jsonplaceholder.typicode.com/posts', () => {
                return new HttpResponse(
                    JSON.stringify({
                        title: 'foo1',
                        body: 'bar',
                        userId: 1,
                    }),
                    { status: 200 },
                );
            }),
        );
        await waitFor(() => screen.getByText('bar'), { timeout: 5000 });
    });

    it('DELETE api on button click', async () => {
        render(<Home />);
        userEvent.click(screen.getByText('Delete'));
        server.use(
            http.delete('https://jsonplaceholder.typicode.com/posts/1', () => {
                return new HttpResponse(null, { status: 200 });
            }),
        );
        screen.debug();
        await waitFor(() => screen.getByText('Total Items : 0'));
        screen.debug();
    });
});
