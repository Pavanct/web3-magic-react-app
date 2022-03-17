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

function App() {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkUser()
      .then((a) => {
        setIsLoggedIn(a.isLoggedIn)
        setUserEmail(a.email)
      })
      .catch((e) => console.error(e))
  }, [isLoggedIn])

  return (
    <div className="App">
      <h1>Web 3 React magic</h1>
      {/* {isLoggedIn ? <Dashboard /> : <Login />} */}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
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
