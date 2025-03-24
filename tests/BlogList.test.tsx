import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BlogList from '@/components/BlogList'
import useStore from '@/lib/store'
import { Post } from '@/types'

jest.mock('@/lib/store', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// eslint-disable-next-line react/display-name
jest.mock('next/dynamic', () => () => (props: { post: Post }) => (
  <div data-testid="lazy-blog-card">{props.post.title}</div>
))

describe('BlogList Component', () => {
  const mockSetPosts = jest.fn()
  const mockUseStore = useStore as jest.Mock

  beforeEach(() => {
    mockUseStore.mockReturnValue({
      posts: [],
      setPosts: mockSetPosts,
      searchQuery: '',
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders initial posts', () => {
    const initialPosts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Content 2', userId: 1 },
    ]

    mockUseStore.mockReturnValue({
      posts: initialPosts,
      setPosts: mockSetPosts,
      searchQuery: '',
    })

    render(<BlogList initialPosts={initialPosts} />)

    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('Post 2')).toBeInTheDocument()
  })

  it('calls setPosts with initialPosts on mount', () => {
    const initialPosts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
    ]

    render(<BlogList initialPosts={initialPosts} />)
    expect(mockSetPosts).toHaveBeenCalledWith(initialPosts)
  })

  it('loads more posts when button is clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 3, title: 'Post 3', body: 'Content 3', userId: 1 },
          ]),
      }),
    ) as jest.Mock

    const initialPosts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Content 1', userId: 1 },
    ]
    mockUseStore.mockReturnValue({
      posts: initialPosts,
      setPosts: mockSetPosts,
      searchQuery: '',
    })

    render(<BlogList initialPosts={initialPosts} />)

    const loadMoreButton = screen.getByRole('button', { name: /load more/i })
    fireEvent.click(loadMoreButton)

    await waitFor(() => expect(mockSetPosts).toHaveBeenCalled())
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('_page=2&_limit=9'),
    )
  })
})
