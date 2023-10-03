import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainContent from '../MainContent';

describe('Main content', () => {
    it('displays title', () => {
      render(<BrowserRouter>
                <MainContent title={'My title'} />
            </BrowserRouter>);

        const title = screen.getByRole('heading', {level: 3});

        expect(title.textContent).toBe('My title');
    });

    it('displays children', () => {
        render(<BrowserRouter>
                    <MainContent title={'My title'}>
                        <p>Hello World!</p>
                    </MainContent>
              </BrowserRouter>);
  
          const child = screen.getByText('Hello World!')
  
          expect(child).toBeInTheDocument();
    });
});