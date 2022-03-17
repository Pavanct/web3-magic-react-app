import SendIcon from "@mui/icons-material/Send"
import { Button, Paper, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/magic"
import "./Login.css"

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
          <br />
          <br />
          <Typography variant="subtitle2" gutterBottom component="div">
            A link will be sent you for Login
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default Login
