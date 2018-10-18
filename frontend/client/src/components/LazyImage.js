import * as React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
import { CDN_BASE_PATH } from "../app/constants";

class LazyImage extends React.Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  };

  static defaultProps = {
    src: "default.png"
  };

  constructor(props) {
    super(props);

    const path = this.props.src.indexOf("http") >= 0 ? this.props.src : `${CDN_BASE_PATH}assets/${this.props.src}`;
    this.state = {
      loaded: false,
      error: false,
      src: path
    };
  }

  componentDidMount() {
    const img = new Image();
    img.src = this.state.src;
    img.alt = this.props.alt;
    img.onload = () => {
      this.setState({ loaded: true });
    };
    img.onerror = () => {
      this.setState({ error: true });
    };
  }

  render() {
    const { src, alt, className } = this.props;
    const { loaded, error } = this.state;

    if (error || src === undefined) return <div />;

    const image = !loaded ? (
      <FontAwesomeIcon icon={faSpinner} spin />
    ) : (
        <img src={src} alt={alt} />
      );

    return <div className={cx(className)}>{image}</div>;
  }
}

export default LazyImage;