# Blog Project with Next.js

This is a blog application built with Next.js App Router, featuring a dynamic blog post system, search functionality, and error handling. The project integrates with a mock API (JSONPlaceholder) to fetch and display blog posts.

---

### Table of Contents

1. [Setup and Running Locally](#setup-and-running-locally)
2. [Features](#features)
3. [Assumptions and Limitations](#assumptions-and-limitations)
4. [API Integration](#api-integration)
5. [Tools Used](#tools-used)

---

### Setup and Running Locally

#### Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Comes with Node.js, or use `yarn`/`pnpm` if preferred.
- **Git**: To clone the repository.

#### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/frontend-test-task.git
   cd frontend-test-task
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

4. **Build and Run Production** (optional):
   ```bash
   npm run build
   npm start
   ```

#### Testing

To run the unit tests:

```bash
npm test
```

Tests are written using Jest and React Testing Library.

---

### Features

#### 1. Homepage (`/`)

- Displays a list of blog posts fetched from the API.
- Includes a search bar to filter posts by query (`/?q=keyword`).
- Implements infinite scroll with a "Load More" button (disabled during search).
- Preserves scroll position and loaded posts when navigating back from a post page.

#### 2. Blog Post Page (`/blog/[slug]`)

- Displays individual blog posts based on their ID (e.g., `/blog/1`).
- Features a header with title and user info, a placeholder image, and post content.
- Statically generated via `generateStaticParams` for all post IDs.

#### 3. Error Handling

- **`error.tsx`**: Redirects to the homepage on any rendering error.
- **`not-found.tsx`**: Redirects to the homepage for 404 cases (e.g., invalid routes or missing posts).
- Custom "Post not found" logic on blog pages redirects via `notFound()`.

---

### Assumptions and Limitations

#### Assumptions

- **API Availability**: The project assumes the JSONPlaceholder API (`https://jsonplaceholder.typicode.com`) is always available and returns valid data.
- **Post IDs**: Assumes post IDs are numeric and sequential (1 to 100, based on JSONPlaceholder).
- **Static Generation**: Assumes all posts should be pre-rendered at build time via `generateStaticParams`.
- **User Experience**: Redirecting to the homepage on errors/404s is acceptable for simplicity.

#### Limitations

- **Mock API**: JSONPlaceholder doesn’t support real search filtering (`&q=` is ignored), so search is simulated client-side or requires a custom API for true filtering.
- **No Pagination Reset**: The "Load More" system doesn’t reset page count on search, which might confuse users if they load many posts before searching.
- **Error Feedback**: Redirects on errors/404s don’t inform users about what went wrong.
- **Scalability**: Limited to 100 posts due to JSONPlaceholder; a real database or API would be needed for more.
- **Styling**: Uses Tailwind CSS with basic theming (light/dark); more complex designs require additional work.

---

### API Integration

#### Approach

- **Data Source**: The project integrates with the JSONPlaceholder API, a free mock API for testing.
- **Fetching Logic**:
  - **`fetchPosts(query)`**: Fetches a paginated list of posts from `https://jsonplaceholder.typicode.com/posts?_page=X&_limit=9&q=query`. Used on the homepage.
  - **`fetchPostById(id)`**: Fetches a single post by ID from `https://jsonplaceholder.typicode.com/posts/${id}`. Used on blog post pages.
  - **`fetchAllPostIds()`**: Fetches all post IDs for static generation.
- **Error Handling**: If fetching fails or returns no data, the app redirects to the homepage.
- **Caching**: Uses Next.js built-in fetch caching (`cache: "no-store"` disabled for fresh data in development).

#### Mock API Setup

- The project currently relies on JSONPlaceholder, which provides 100 posts with fields: `id`, `userId`, `title`, and `body`.

---

### Tools Used

- **Next.js**: Framework for server-side rendering, static generation, and routing (App Router).
- **React**: Core library for building UI components.
- **TypeScript**: Static typing for better code reliability.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zustand**: Lightweight state management for search and post data.
- **Jest & React Testing Library**: Unit testing for components.
- **JSONPlaceholder**: Mock API for blog post data.
