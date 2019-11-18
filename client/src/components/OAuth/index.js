import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { API_URL } from '../../config'
import UserContext from '../../UserContext'
import { Redirect } from "react-router-dom";

import { Button } from "reactstrap";


export default class OAuth extends Component {
  static contextType = UserContext;

  state = {
    user: {},
    disabled: ""
  }

  componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, user => {
      this.context.setUser(user);
      this.popup.close()
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
      }
    }, 1000)
  }

  openPopup() {
    if (this.state.disabled) { return; }
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()
      this.checkPopup()
    }
  }

  closeCard = () => {
    this.setState({ user: {} })
  }

  renderRedirect = () => {
    if (this.context.isAuthenticated()) {
      if (!this.context.user.registered) {
        return <Redirect to='/register' />
      } else {
        return <Redirect to='/profile' />
      }

    }
  }

  render() {
    const { name } = this.state.user
    const { provider } = this.props
    return (
      <>
        {this.renderRedirect()}
        {name
          ? <div>
            Logged in as {name}
          </div>
          :
          <Button
            className="btn-neutral btn-just-icon mr-1"
            color={provider}
            onClick={this.startAuth}
            href="#"
          >
            <FontAwesome
              name={provider}
            />
          </Button>
        }
      </>
    )
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}