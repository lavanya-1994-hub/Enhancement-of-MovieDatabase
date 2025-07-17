import Loader from 'react-loader-spinner'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-container">
      <h1>No results found.</h1>
      <p>Do not get worried, Try to search again.</p>
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse

    return (
      <ul className="row p-0 mt-3">
        {results.map(eachMovie => (
          <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultsView = value => {
    const {apiStatus, searchResponse} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchQuery} = value

        return (
          <>
            <NavBar />
            <div className="route-page-body">
              {renderSearchResultsView(value)}
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallBack={onTriggerSearchQuery}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}
export default SearchQuery
