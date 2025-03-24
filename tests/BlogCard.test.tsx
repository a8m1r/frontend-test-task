import { render, screen } from '@testing-library/react'
import BlogCard from '@/components/BlogCard'
import { Post } from '@/types'
import '@testing-library/jest-dom'

jest.mock('next/image', () => {
  // eslint-disable-next-line react/display-name
  return ({
    src,
    alt,
    width,
    height,
    className,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
})

const mockPost: Post = {
  id: 1,
  title: 'Test Post Title',
  body: 'This is the body of the test post.',
  userId: 1,
}

describe('BlogCard Component', () => {
  it('renders post title and body correctly', () => {
    render(<BlogCard post={mockPost} />)
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    expect(
      screen.getByText('This is the body of the test post.'),
    ).toBeInTheDocument()
  })

  it('displays the correct alt text for the image', () => {
    render(<BlogCard post={mockPost} />)
    const image = screen.getByAltText('Test Post Title')
    expect(image).toBeInTheDocument()
  })

  it('renders the link with the correct href attribute', () => {
    render(<BlogCard post={mockPost} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/1')
  })

  it('displays an image with a placeholder src', () => {
    render(<BlogCard post={mockPost} />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/placeholder.jpg')
  })
})
