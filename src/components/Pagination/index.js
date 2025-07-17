import React from 'react'
import './index.css'

class Pagination extends React.Component {
  state = {pageNo: 1}

  onNextPage = () => {
    const {totalPages, apiCallBack} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallBack(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallBack} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallBack(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          className="control-button"
          onClick={this.onPrevPage}
        >
          Prev
        </button>
        <p className="page-no">{pageNo}</p>
        <button
          type="button"
          className="control-button"
          onClick={this.onNextPage}
        >
          Next
        </button>
      </div>
    )
  }
}
export default Pagination
