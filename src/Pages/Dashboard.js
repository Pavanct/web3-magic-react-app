import React, { useEffect } from "react"
import { useState } from "react"
import {
  fetchAccounts,
  fetchBalance,
  logout,
  send,
} from "../services/magic"

import { Button, Tab, Tabs, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import TabPanel from "../components/TabPanel"
import PropTypes from "prop-types"
import { CopyToClipboard } from "react-copy-to-clipboard"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { useNavigate } from "react-router-dom"
import SendIcon from "@mui/icons-material/Send"
import Alert from "@mui/material/Alert"

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
  const [accountAddress, setAccountAddress] = useState("")
  const [balance, setBalance] = useState(null)
  const [destinationAddress, setDestinationAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [alert, setAlert] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const account = await fetchAccounts()
      setAccountAddress(account)
      const b = await fetchBalance(address)
      setBalance(b)
    }
    fetchData().catch((err) => console.error(err))
  }, [balance])

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const sendTransaction = async () => {
    const receipt = await send({
      fromAddress: address,
      destination: destinationAddress,
      amountToSend: amount,
    })
    setAlert(true)
  }

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
          variant="outlined"
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
          width: "30vw",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="Send" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* Account information */}
        {accountAddress}
        <CopyToClipboard text={accountAddress}>
          {/* <ContentCopyIcon /> */}
          <Button>
            <ContentCopyIcon />
          </Button>
        </CopyToClipboard>
        <br />
        <br />
        <Typography variant="h5" gutterBottom component="span">
          {balance} MATIC
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Send */}
        <Typography variant="subtitle1" gutterBottom component="span">
          Your address:
          {accountAddress}
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
          size="small"
        >
          Send MATIC
        </Button>
      </TabPanel>
      {alert ? <Alert severity="info">Transaction started</Alert> : <></>}
    </div>
  )
}

export default Dashboard
