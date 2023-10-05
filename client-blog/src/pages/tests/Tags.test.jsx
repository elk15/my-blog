import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';
import { ServerDataContext } from '../../context/ServerDataContext';
import Tags from '../Tags';

const MockDataProvider = ({children}) => {
    const posts = [
        {
            "_id": "65195b97addfbb65cb69c78a",
            "title": "Title 1",
            "snippet": "Example post",
            "body": "Enter text here",
            "tags": ["java"],
            "createdAt": "2023-10-01T11:44:23.301Z",
        },
        {
            "_id": "65195b97addfbb65cb69c78b",
            "title": "Title 2",
            "snippet": "Example post",
            "body": "Enter text here",
            "tags": ["react", "Front End"],
            "createdAt": "2023-10-01T11:44:23.301Z",
        },
        {
            "_id": "65195b97addfbb65cb69c78c",
            "title": "Title 3",
            "snippet": "Example post",
            "body": "Enter text here",
            "tags": ["react", "java", "testing"],
            "createdAt": "2023-10-01T11:44:23.301Z",
        }
    ]

    // Tags:FRONT END(1), JAVA(2), REACT(2), TESTING(1) 

    return (
        <ServerDataContext.Provider value={{posts}}>
            {children}
        </ServerDataContext.Provider>
    )
}

describe('Tag Page', () => {
    it('displays tags in alphabetical order, in all caps and with correct amount', () => {
        render(
            <MockDataProvider>
                <BrowserRouter>
                    <Tags/>
                </BrowserRouter>
            </MockDataProvider>
            );

        const tags = screen.getAllByRole('tag');

        expect(tags.length).toBe(4);
        expect(tags[0].textContent).toBe('FRONT END (1)');
        expect(tags[1].textContent).toBe('JAVA (2)');
        expect(tags[2].textContent).toBe('REACT (2)');
        expect(tags[3].textContent).toBe('TESTING (1)');
    });

});