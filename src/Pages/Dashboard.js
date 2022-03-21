import React, { useEffect } from "react"
import { useState } from "react"
import { fetchBalance, logout, send } from "../services/magic"
import CloseIcon from "@mui/icons-material/Close"

import {
  Alert,
  Backdrop,
  Button,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import TabPanel from "../components/TabPanel"
import PropTypes from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { useNavigate } from "react-router-dom"
import SendIcon from "@mui/icons-material/Send"

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function Dashboard({ address }) {
  const [balance, setBalance] = useState(null)
  const [destinationAddress, setDestinationAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [alert, setAlert] = useState(false)
  const [alertBody, setAlertBody] = useState("")
  const [backDropOpen, setBackDropOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const b = await fetchBalance(address)
      setBalance(b)
    }
    fetchData().catch((err) => console.error(err))
  }, [balance, address])

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const sendTransaction = async () => {
    setBackDropOpen(true)
    const receipt = await send({
      fromAddress: address,
      destination: destinationAddress,
      amountToSend: amount,
    })

    setAlertBody("Hash: " + receipt.transactionHash)
    handleClose("backdrop")
    clearInputs()
    setAlert(true)
  }

  const clearInputs = () => {
    setAmount("")
    setDestinationAddress("")
  }

  const handleClose = (element) => {
    element === "backdrop" ? setBackDropOpen(false) : setAlert(false)
  }

  const handleCopy = () => {
    setAlertBody("copied: " + address)
    setAlert(true)
  }

  const action = (
    <Button
      color="inherit"
      size="small"
      onClick={() => handleClose("snackbar")}
    >
      <CloseIcon />
    </Button>
  )

  return (
    <div>
      <div
        style={{
          justifyContent: "flex-end",
          marginBottom: "20px",
          display: "flex",
          marginRight: "6%",
        }}
      >
        <Button
          variant="contained"
          color="warning"
          onClick={async () => {
            await logout()
            navigate("/login")
          }}
        >
          Logout
        </Button>
      </div>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          justifyContent: "center",
          flexDirection: "row",
          margin: "0 auto",
          width: "40vw",
          flexWrap: "wrap",
          wordWrap: "break-word",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          centered
          style={{ background: "whitesmoke" }}
        >
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="Send" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} style={{ textAlign: "left" }}>
          {/* Account information */}
          {address}
          <CopyToClipboard text={address} onCopy={() => handleCopy()}>
            {/* <ContentCopyIcon /> */}
            <Button>
              <ContentCopyIcon />
            </Button>
          </CopyToClipboard>
          <br />
          <br />
          <Typography
            variant="body1"
            gutterBottom
            component="span"
            fontSize="16px"
            fontWeight="600"
          >
            {balance} MATIC
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ textAlign: "left" }}>
          {/* Send */}
          <Typography
            variant="body1"
            gutterBottom
            component="span"
            fontWeight="600"
          >
            Amount available:&nbsp;
          </Typography>
          <Typography variant="body1" gutterBottom component="span">
            {balance} MATIC
          </Typography>
          <br />
          <br />
          <Typography
            variant="body1"
            gutterBottom
            component="span"
            fontWeight="600"
          >
            Your address:&nbsp;
          </Typography>
          <Typography variant="body1" gutterBottom component="span">
            {address}
          </Typography>
          <br />
          <br />
          <TextField
            className="dest-address"
            id="standard-text-input"
            label="Destination address"
            type="text"
            variant="standard"
            size="medium"
            autoComplete="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            style={{ marginRight: "10px", width: "50%" }}
          />
          <br />
          <br />
          <TextField
            className="amount"
            id="standard-text-input"
            label="Amount"
            type="text"
            variant="standard"
            size="medium"
            autoComplete="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginRight: "10px", width: "20%" }}
          />
          <br />
          <br />
          <Button
            onClick={() => sendTransaction()}
            variant="contained"
            endIcon={<SendIcon />}
            color="primary"
          >
            Send
          </Button>
        </TabPanel>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropOpen}
          onClick={() => handleClose("backdrop")}
        >
          {/* <CircularProgress color="primary" /> */}
          <Typography variant="body1" gutterBottom component="span">
            Sending {amount}&nbsp;
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom component="span">
            Please wait for confirmation...
          </Typography>
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          action={action}
          autoHideDuration={6000}
          open={alert}
          onClose={() => handleClose("snackbar")}
        >
          <Alert
            onClose={() => handleClose("snackbar")}
            severity="success"
            sx={{ width: "100%" }}
          >
            {alertBody}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  )
}

export default Dashboard
