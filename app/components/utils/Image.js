import React from 'react'
import BookUnavailabelImg from '../../img/book-unavailable.png'

export default class Image extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      src: this.props.src
    }
    this.imageEl = ''
  }
  handleLoad () {
    this.setState({
      loading: false
    })
  }
  handleError () {
    this.setState({
      loading: false,
      src: BookUnavailabelImg
    })
  }
  render () {
    return (
      <div>
        <div className='imgContainer'>
          <span className={this.state.loading ? 'loader' : ''}></span>
          <img
            className={this.props.type ? 'imgLarge' : 'imgMedium'}
            src={this.state.src}
            onLoad={() => this.handleLoad()}
            onError={() => this.handleError()} />
        </div>
      </div>
    )
  }
}
