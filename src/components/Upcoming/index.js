import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

class Upcoming extends React.Component {
  state = {
    isLoading: true,
    upcomingMovieResponseData: {},
  }

  componentDidMount() {
    this.getUpcomingMovieResponse()
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

  getUpcomingMovieResponse = async () => {
    const API_KEY = 'e384a3641efca8f4ae54f7cdaf8bc1a3'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovieResponseData: updatedData})
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderUpcomingMoviesList = () => {
    const {upcomingMovieResponseData} = this.state
    const {results} = upcomingMovieResponseData

    return (
      <ul className="row p-0 mt-3 ">
        {results.map(eachMovie => (
          <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovieResponseData} = this.state

    return (
      <>
        <NavBar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoaderView()
            : this.renderUpcomingMoviesList()}
        </div>
        <Pagination
          totalPages={upcomingMovieResponseData.totalPages}
          apiCallBack={this.getTopRatedMovieResponse}
        />
      </>
    )
  }
}
export default Upcoming
