import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

class Popular extends React.Component {
  state = {
    isLoading: true,
    popularMovieResponseData: {},
  }

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesData = async () => {
    const API_KEY = 'e384a3641efca8f4ae54f7cdaf8bc1a3'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponseData: newData})
  }

  renderLoaderView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMovieResponseData} = this.state
    const {results} = popularMovieResponseData

    return (
      <ul className="row">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <NavBar />
        <div className="route-page-body">
          {isLoading ? this.renderLoaderView() : this.renderPopularMoviesList()}
        </div>
        <Pagination />
      </>
    )
  }
}
export default Popular
