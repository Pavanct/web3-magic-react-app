import React, { useState } from "react"
import { Button, Paper, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import "./Login.css"
import { login } from "../services/magic"
import { useNavigate } from "react-router-dom"

function Login() {
  //   const classes = useStyles()
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const submitEmail = async () => {
    // e.preventDefault()
    console.log(email)
    await login(email)
    navigate("/")
  }
  return (
    <div className="container">
      <Paper elevation={15}>
        <div className="form-container">
          <h3> Login to access the wallet </h3>
          <TextField
            className="email-input"
            id="standard-email-input"
            label="email address"
            type="email"
            variant="standard"
            size="medium"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <Button
            onClick={() => submitEmail()}
            variant="contained"
            endIcon={<SendIcon />}
            color="primary"
            size="small"
          >
            Send Email
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default Login
