import React from 'react'
import { Header, Message, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const showLoginBtn = () => {
    if (!isAuthenticated) {
      return (
        <Button color='black' animated secondary>
          <Button.Content visible>Login</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
      )
    }
  }

  return (
    <div>
      <Message className='message-container' size='huge' secondary='true'>
        <Header size='huge'> Home</Header>
        <p style={{ marginBottom: '5px' }}>welcome</p>
        <Link to='/login'>{showLoginBtn()}</Link>
      </Message>
    </div>
  )
}

export default Home
