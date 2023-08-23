// import { ModalLoading } from 'components'
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext<any>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
