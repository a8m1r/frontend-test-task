import { create } from 'zustand'
import { Post } from '@/types'

interface State {
  posts: Post[]
  searchQuery: string
}

interface Actions {
  setPosts: (posts: Post[]) => void
  setSearchQuery: (query: string) => void
}

const useStore = create<State & Actions>((set) => ({
  posts: [],
  searchQuery: '',

  setPosts: (posts) => set(() => ({ posts })),
  setSearchQuery: (query) => set(() => ({ searchQuery: query })),
}))

export default useStore
