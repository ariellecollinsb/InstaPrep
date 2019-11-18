import React from 'react'

const UserContext = React.createContext({
  user: {},
  socket: undefined,
  setUser: () => { },
  isLoggedIn: () => { }
})

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext
