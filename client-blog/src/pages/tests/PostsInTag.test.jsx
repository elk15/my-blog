import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';
import { ServerDataContext } from '../../context/ServerDataContext';
import PostsInTag from '../PostsInTag';

const MockDataProvider = ({children}) => {
    const posts = [
        {
            "_id": "65195b97addfbb65cb69c78a",
            "title": "Title 1",
            "snippet": "Example post",
            "body": "Enter text here",
            "tags": ["test"],
            "createdAt": "2023-10-01T11:44:23.301Z",
        },
        {
            "_id": "65195b97addfbb65cb69c78b",
            "title": "Title 2",
            "snippet": "Example post",
            "body": "Enter text here",
            "tags": ["test"],
            "createdAt": "2023-10-01T11:44:23.301Z",
        },
        {
            "_id": "65195b97addfbb65cb69c78c",
            "title": "Title 3",
            "snippet": "Example post",
            "body": "Enter text here",
            "tags": ["test1"],
            "createdAt": "2023-10-01T11:44:23.301Z",
        }
    ]

    return (
        <ServerDataContext.Provider value={{posts}}>
            {children}
        </ServerDataContext.Provider>
    )
}

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({tag: 'test'}),
    }
})

describe('Posts in Tag Page', () => {
    it('displays correct articles after search', async () => {
        const user = userEvent.setup();
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <PostsInTag/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const searchBar = screen.getByRole('textbox');
        await user.type(searchBar, "Title 1");

        expect(screen.getByText("Example post")).toBeInTheDocument();
    });

    it('displays articles', async () => {
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <PostsInTag/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const articles = screen.getAllByText('Example post');

        expect(articles.length).toBe(2);
    });

});