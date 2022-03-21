import SendIcon from "@mui/icons-material/Send"
import { Button, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/magic"
import "./Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const submitEmail = async () => {
    await login(email)
    navigate("/")
  }
  return (
    <div className="container">
      <div className="form-container">
        <h3> Login/Sign up </h3>
        <br />
        <TextField
          className="email-input"
          id="standard-email-input"
          label="Email address"
          type="email"
          variant="filled"
          size="small"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
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
          Send
        </Button>
        <br />
        <br />
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          fontWeight="bold"
        >
          A verification link will be sent to your email address.
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          fontWeight="bold"
        >
          If you are a new user, you will be automatically signed up and a
          verification link will be sent to your email address to login.
        </Typography>
      </div>
    </div>
  )
}

export default Login
