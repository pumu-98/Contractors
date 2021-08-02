import { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'

import Header from './components/Header'
import Welcome from './components/Welcome'
import ContractList from './components/ContractList'
import AddContract from './components/AddContract'
import EditContract from './components/EditContract'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/auth/Profile'

export const UserContext = createContext()

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token == null){
        localStorage.setItem("auth-token", "")
        token = ""
      }

      const tokenResponse = await axios.post(
        '/api/users/tokenIsValid', 
        null, 
        {headers: {"auth-token": token}}
      )

      console.log(tokenResponse.data)
      if(tokenResponse.data){
        const userResponse = await axios.get('/api/users/profile',
          {headers: {'auth-token': token}}
        )
        setUserData({
          token: token,
          user: userResponse.data
        })
      }
    }
    isLoggedIn()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Header />
        <Container>        
            <Route path='/' exact component={Welcome} />
            <Route path='/contractorlist' component={ContractList} />
            <Route path='/addcontract' component={AddContract} />
            <Route path='/contract/:id' component={EditContract} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={Profile} />        
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
