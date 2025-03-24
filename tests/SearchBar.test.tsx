import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBar from '@/components/SearchBar'
import useStore from '@/lib/store'
import { useRouter, useSearchParams } from 'next/navigation'

jest.mock('@/lib/store', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setSearchQuery: jest.fn(),
  })),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe('SearchBar', () => {
  const mockSetSearchQuery = jest.fn()
  const mockPush = jest.fn()
  const mockGet = jest.fn()

  beforeEach(() => {
    ;(useStore as jest.Mock).mockReturnValue({
      setSearchQuery: mockSetSearchQuery,
    })
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useSearchParams as jest.Mock).mockReturnValue({ get: mockGet })
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('renders with initial value from searchParams', () => {
    mockGet.mockReturnValue('test')
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search posts...')
    expect(input).toHaveValue('test')
  })

  it('renders with empty value when no searchParams', () => {
    mockGet.mockReturnValue(null)
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search posts...')
    expect(input).toHaveValue('')
  })

  it('updates input value on change', () => {
    mockGet.mockReturnValue('')
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search posts...')
    fireEvent.change(input, { target: { value: 'new query' } })
    expect(input).toHaveValue('new query')
  })

  it('calls setSearchQuery and updates URL after debounce', async () => {
    mockGet.mockReturnValue('')
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search posts...')

    fireEvent.change(input, { target: { value: 'test query' } })
    expect(mockSetSearchQuery).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200)
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith('test query')
      expect(mockPush).toHaveBeenCalledWith('/?q=test%20query')
    })
  })

  it("resets URL to '/' when input is cleared", async () => {
    mockGet.mockReturnValue('initial')
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search posts...')

    fireEvent.change(input, { target: { value: '' } })
    jest.advanceTimersByTime(200)
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith('')
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('clears timeout on unmount', () => {
    mockGet.mockReturnValue('')
    const { unmount } = render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search posts...')

    fireEvent.change(input, { target: { value: 'test' } })
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')

    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
