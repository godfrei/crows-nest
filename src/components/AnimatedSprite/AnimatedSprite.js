import React from "react"
import PropTypes from 'prop-types';
import spriteStyles from "./animatedsprite.module.scss"

export default class AnimatedSprite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: parseInt(props.width, 10),
      width: parseInt(props.width, 10),
      height: parseInt(props.height, 10)
    }
  }

  componentDidMount() {
    const interval = 250 /* Quarter second, so one walk cycle takes a second */
    this.timer = setInterval ( () => {
      this.animate()
      }, interval )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  animate() {
    let position = this.state.position
    if (position >= this.state.width * 3) {
      position = 0
    } else {
      position = position + this.state.width
    }
    this.setState({
      position: position
    });
  }


  render() {
    let styles = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
      backgroundPosition: `-${this.state.position}px 0px`,
      backgroundImage: `url(${this.props.spritePath})`
    }

    return (
      <div className={spriteStyles.wax} style={styles}></div>
    )
  }
}

AnimatedSprite.propTypes = {
  spritePath: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}
