import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Post from '../Post';

const mockPost = {
    "_id": "65195b97addfbb65cb69c78c",
    "title": "Blog Title",
    "snippet": "Learn more about blogging here...",
    "tags": [
        "test",
        "blogging",
        "writing"
    ],
    "createdAt": "2023-10-01T11:44:23.301Z",
}

describe('Post item', () => {
    it('displays date correctly', () => {
      render(
        <BrowserRouter>
            <Post post={mockPost} />
        </BrowserRouter>
        );

        const date = screen.getByText('01 Oct 2023');

        expect(date).toBeInTheDocument();
    });

    it('displays title', () => {
        render(
        <BrowserRouter>
            <Post post={mockPost} />
        </BrowserRouter>
        );

        const title = screen.getByText('Blog Title');

        expect(title).toBeInTheDocument();
    });

    it('displays tags correctly', () => {
        render(
            <BrowserRouter>
                <Post post={mockPost} />
            </BrowserRouter>
            );
    
        const tag = screen.getByText('TEST');
    
        expect(tag).toBeInTheDocument();
    });

    it('displays snippet', () => {
        render(
            <BrowserRouter>
                <Post post={mockPost} />
            </BrowserRouter>
            );
    
        const snippet = screen.getByText('Learn more about blogging here...');
    
        expect(snippet).toBeInTheDocument();
    });
});