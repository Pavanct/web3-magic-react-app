import { CircularProgress, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import PrivateRoute from "@components/PrivateRoute"
import Dashboard from "@pages/Dashboard"
import Login from "@pages/Login"
import { checkUser } from "@services/magic"
import { UserContext } from "@context/UserContext"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [address, setAddress] = useState("")
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function validateUser() {
      try {
        const user = await checkUser()
        user && user.isLoggedIn
          ? setIsLoggedIn(user.isLoggedIn)
          : setIsLoggedIn(false)
        user && user.publicAddress
          ? setAddress(user.publicAddress)
          : setAddress("")
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    validateUser()
  }, [isLoggedIn])

  if (isLoading) {
    return (
      <div className="progress-bar">
        <CircularProgress color="info" />
      </div>
    )
  }

  return (
    <div className="App">
      <Paper
        elevation={15}
        style={{ padding: "30px", minHeight: "48vh", minWidth: "30vw" }}
      >
        <Typography variant="h5" gutterBottom component="div">
          Magic Wallet
        </Typography>
        <UserContext.Provider value={isLoggedIn}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard address={address} />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </Router>
        </UserContext.Provider>
      </Paper>
    </div>
  )
}

export default App
