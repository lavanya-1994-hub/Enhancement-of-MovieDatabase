import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {onTriggerSearchQuery, searchInput, changeSearchInput} = value

        const onChangeHandler = event => changeSearchInput(event.target.value)
        const searchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchQuery()
          history.push('/search')
        }

        return (
          <div className="d-flex align-items-center">
            <input
              type="textbox"
              value={searchInput}
              onChange={onChangeHandler}
              className="search-input"
              placeholder="Search"
            />
            <button
              type="button"
              onClick={searchHandler}
              className="btn btn-outline-info"
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <h1 className="movie-logo">MovieDB</h1>
      </div>
      <div>
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}
export default withRouter(NavBar)
