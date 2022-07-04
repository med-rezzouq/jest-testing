import React from 'react'
import Home from '../pages/index'
import { render, screen,within } from '@testing-library/react'
import { mockProducts } from '../__mocks__/mockProducts';
import { mockCategories } from '../__mocks__/mockData';
import userEvent from '@testing-library/user-event';


describe("home page", () => {
    
     // we can do "it" or "test"
    it("render all products heading", () => {
        //first we load the component to search inside it
        render(<Home  products={mockProducts} categories={[]} />);
        //then we search an element heading means we need to find h1 or h2... tag
        screen.getByRole('heading',
            { name: /All Products/i });

    });


     it("render an accessible input",()=> {
             render(<Home  products={mockProducts} categories={[]} />);
             const searchInput = screen.getByRole('searchbox');
             expect(searchInput).toHaveAccessibleName("Search")
     });
    
    
    
     it("it render all products",()=> {
        render(<Home products={mockProducts} categories={[]} />);
        const allproducts = screen.getByRole('list',
            { name: /products/i });
         //we do this when we have multiple ul lists and we want sepcify it
         const { getAllByRole } = within(allproducts);
         const listitems = getAllByRole("listitem");
         expect(listitems.length).toBe(3);

    
    });
    

    it("it render all categories",()=> {
        render(<Home products={mockProducts} categories={mockCategories} />);
        const allcategories = screen.getByRole('list',
            { name: /categories/i });
        const { getAllByRole } = within(allcategories);
        const listitems = getAllByRole("listitem");
        expect(listitems.length).toBe(2);
    });
 
    // it("it render 1 product per category",()=> {
    //     render(<Home products={mockProducts} categories={[]} />);
    //     const categoryList = screen.getByRole('list',
    //         { name: /Mouse/i });
    //         const { getAllByRole } = within(categoryList);
    //         const listitems = getAllByRole("listitem");
    //         expect(listitems.length).toBe(1);
    // });

    it("show only search results when seach item is not empty",async  ()=> {
        render(<Home products={mockProducts} categories={mockCategories} />);
        const searchBox = screen.getByPlaceholderText(/Search products/);

        await  userEvent.type(searchBox, 'mo');

        const searchResults = screen.getByRole("list",
        { name: /search results/i });
        expect(searchResults).toBeVisible();

        const { getAllByRole } = within(searchResults);
        const listitems = getAllByRole("listitem");
        expect(listitems.length).toBe(2);

        const allproducts = screen.queryByRole("list",
            { name: /products/i });
        expect(allproducts).toBeNull();

        // setTimeout(() => {}, 0);

    });
        
});
