import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';
import { ServerDataContext } from '../../context/ServerDataContext';
import PostPage from '../PostPage';

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

    let comments = [
        {
            "_id": "651d28883278f89598d7633c",
            "name": "Anon",
            "body": "hello!",
            "replyingTo": "65195b97addfbb65cb69c78a",
            "createdAt": "2023-10-04T08:55:36.426Z",
            "updatedAt": "2023-10-04T08:55:36.426Z",
            "__v": 0
        },
        {
            "_id": "651d28883278f89598d7633a",
            "name": "Anon2",
            "body": "hello again!",
            "replyingTo": "65195b97addfbb65cb69c78a",
            "createdAt": "2023-10-04T08:55:36.426Z",
            "updatedAt": "2023-10-04T08:55:36.426Z",
            "__v": 0
        },
        {
            "_id": "651d28883278f89598d7633a",
            "name": "Anon3",
            "body": "hello again!",
            "replyingTo": "65195b97addfbb65cb69c78c",
            "createdAt": "2023-10-04T08:55:36.426Z",
            "updatedAt": "2023-10-04T08:55:36.426Z",
            "__v": 0
        },
    ]

    const setComments = (data) => comments = data;

    return (
        <ServerDataContext.Provider value={{posts, comments, setComments}}>
            {children}
        </ServerDataContext.Provider>
    )
}

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({postid: '65195b97addfbb65cb69c78a'}),
    }
})

describe('Post Page', () => {
    it('displays comment form when clicking "Add a comment"', async () => {
        const user = userEvent.setup();
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <PostPage/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const button = screen.getByText('Add a comment');
        await user.click(button);

        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it('displays article', async () => {
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <PostPage/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const articleBody = screen.getByText('Enter text here');
        const articleTitle = screen.getByText('Title 1');

        expect(articleBody).toBeInTheDocument();
        expect(articleTitle).toBeInTheDocument();
    });

    it('displays correct comments', async () => {
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <PostPage/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const username = screen.queryByText('Anon3');

        expect(username).toBe(null);
    });

    it('allows user to type new comments', async () => {
        const user = userEvent.setup();
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <PostPage/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const button = screen.getByText('Add a comment');
        await user.click(button);

        const nameInput = screen.getByPlaceholderText('Name');
        const commentInput = screen.getByPlaceholderText('Comment');
        await user.type(nameInput, 'user1');
        await user.type(commentInput, 'Hello World!');

        expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

});