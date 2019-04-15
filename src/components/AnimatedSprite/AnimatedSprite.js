import React from "react"
import PropTypes from 'prop-types';
import spriteStyles from "./animatedsprite.module.scss"

export default class AnimatedSprite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: props.active,
      spritePos: { 
        x: parseInt(props.width, 10),
        y: 0
      },
      width: parseInt(props.width, 10),
      height: parseInt(props.height, 10),
      mousePos: null
    }
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    // document.addEventListener('mousemove', this.onMouseMove)

    // const interval = 250 /* Quarter second, so one walk cycle takes a second */
    // this.timer = setInterval( () => {
    //   // if(this.state.active) this.animate()
    // }, interval )
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove)
    clearInterval(this.timer)
  }

  onMouseMove(event) {
    const prevMousePos = this.state.mousePos
    let mousePos = prevMousePos
    let spritePos = this.state.spritePos
    const newMousePos = {
      x: event.pageX,
      y: event.pageY
    }
    if (!prevMousePos) {
      this.setState({
        mousePos: newMousePos
      })
      return;
    }

    const moveDelta = 100
    if(newMousePos.x - prevMousePos.x >= moveDelta) {
      spritePos.y = spritePos.y - this.state.height
      mousePos = newMousePos
    }
    else if(newMousePos.x - prevMousePos.x <= -moveDelta) {
      spritePos.y = spritePos.y + this.state.height
      mousePos = newMousePos
    }

    this.setState({
      mousePos: mousePos,
      spritePos: spritePos
    })
  }

  animate() {
    let spritePos = this.state.spritePos
    if (spritePos.x >= this.state.width * 3) {
      spritePos.x = 0
    } else {
      spritePos.x = spritePos.x + this.state.width
    }
    this.setState({
      spritePos: spritePos
    });
  }

  render() {
    const waxStyles = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
      // backgroundPosition: `-${this.state.spritePos.x * 4}px ${this.state.spritePos.y}px`,
      backgroundPosition: `-${this.state.spritePos.x * 4}px 0`,
      backgroundImage: `url(${this.props.spritePath})`,
      transform: `scale(${this.props.scale})`
    }
    const scaledWidth = this.state.width * this.props.scale;
    const scaledHeight = this.state.height * this.props.scale;
    const containerStyles = {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
    }

    let containerClass = "spriteContainer"
    console.log(this.props.active)
    if (this.props.active) containerClass += " active"
    console.log(containerClass)

    return (
      <div className={containerClass} style={containerStyles}>
        <div className={`${spriteStyles.wax} ${this.props.active && spriteStyles.active}`} style={waxStyles}></div>
      </div>
    )
  }
}

AnimatedSprite.propTypes = {
  active: PropTypes.bool,
  spritePath: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number
}

AnimatedSprite.defaultProps = {
  scale: 1,
  active: false
}
