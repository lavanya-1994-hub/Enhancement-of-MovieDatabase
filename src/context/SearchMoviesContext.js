import React from 'react'

const SearchMoviesContext = React.createContext({
  apiStatus: '',
  searchInput: '',
  changeSearchInput: () => {},
  searchResponse: '',
  onTriggerSearchQuery: '',
})
export default SearchMoviesContext
