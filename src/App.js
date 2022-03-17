import { Fragment, useEffect, useState } from "react"
import "./App.css"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login"
import { checkUser } from "./services/magic"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { UserContext } from "./context/userContext"
import { Typography } from "@mui/material"

function App() {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [address, setAddress] = useState("")

  useEffect(() => {
    checkUser()
      .then((a) => {
        setIsLoggedIn(a.isLoggedIn)
        setUserEmail(a.email)
        setAddress(a.publicAddress)
      })
      .catch((e) => console.error(e))
  }, [isLoggedIn])

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom component="div">
        React Magic Link with Web3
      </Typography>
      {/* {isLoggedIn ? <Dashboard /> : <Login />} */}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Dashboard address={address} />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
