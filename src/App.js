import { CircularProgress, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login"
import { checkUser } from "./services/magic"
import { UserContext } from "./context/UserContext"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [address, setAddress] = useState("")
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
      .then(({ isLoggedIn, publicAddress }) => {
        setIsLoggedIn(isLoggedIn)
        setAddress(publicAddress)
        setLoading(false)
      })
      .catch((e) => console.error(e))
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
        <Typography variant="h4" gutterBottom component="div">
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
