import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'
import '@testing-library/jest-dom'

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('false')
    Storage.prototype.setItem = jest.fn()
  })

  it('renders the button with the correct emoji for light mode', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('🌙')
  })

  it('renders the button with the correct emoji for dark mode', () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('true')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('☀️')
  })

  it('adds "dark" class to the document element when dark mode is enabled', () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('false')

    render(<ThemeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'true')
  })

  it('removes "dark" class from the document element when dark mode is disabled', () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('true')

    render(<ThemeToggle />)

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'false')
  })

  it('checks if darkMode is initially set from localStorage', () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('true')

    render(<ThemeToggle />)

    expect(screen.getByRole('button')).toHaveTextContent('☀️')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
