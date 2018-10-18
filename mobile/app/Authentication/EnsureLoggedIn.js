import { Component } from 'react';
import { connect } from 'react-redux';

class EnsureLoggedInContainer extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props
  }

  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return this.props.children
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)