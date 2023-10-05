import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { ServerDataContext } from '../../context/ServerDataContext';

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
            "tags": ["test"],
            "createdAt": "2023-10-01T11:44:23.301Z",
        }
    ]

    return (
        <ServerDataContext.Provider value={{posts}}>
            {children}
        </ServerDataContext.Provider>
    )
}

describe('Home page', () => {
    it('displays correct articles after search', async () => {
        const user = userEvent.setup();
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <Home/>
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
                    <Home/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const articles = screen.getAllByText('Example post');

        expect(articles.length).toBe(3);
    });

});