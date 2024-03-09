# Exercise: Sortable Table

* The reusability/flexibility of the `<SortableTable>` component (or set of components) you'll be coding up
* The user interface and user experience of your app:
  * Visual design
  * Navigation and Accessibility
  * Performance

For reference, we use the following tech stack for this exercise:
* [TypeScript](https://www.typescriptlang.org)
* [React](https://reactjs.org)
* [Jest](https://jestjs.io)

## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## User-focused Requirements

### Search
* [ ] As a user, I want to search for cities by city name
* [ ] As a user, I want to search for cities by country name
* [ ] As a user, I should know when a search is pending
* [ ] As a user, I should know when a search does not match any city
* [ ] As a user, I should know when a search fails
* [ ] [Performance] As a user, I want the search to only kick in after 150ms since my last change to the search term

### Sorting
* [ ] As a user, I want to be able to toggle sorting (ascending) the search results by a single column
* [ ] As a user, I want to be able to toggle between ascending, descending, or no sorting of the search results by a single column
* [ ] As a user, I want to be able to toggle between ascending, descending, or no sorting of the search results by multiple columns

### Pagination
* [ ] As a user, I want to be able to paginate through search results using a fixed page size (10)
* [ ] As a user, I want to be able to navigate between result pages
* [ ] As a user, I want to be able to paginate through search results using a dynamic page size
* [ ] As a user, I want to be able to go all the way to the first and last pages of the search results

### Accessibility
* [ ] As a user, I want to be able to navigate the page using only a keyboard
* [ ] As a user, I want to be able to use a screen reader to know about dynamic content updates for sorting, pagination, errors, and search

### Design

* [ ] As a user, I can view the search results on a narrow screen
