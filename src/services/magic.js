import { Magic, RPCError, RPCErrorCode } from "magic-sdk"
import Web3 from "web3"

/**
 * Configure Polygon Connection
 */
const polygonNodeOptions = {
  rpcUrl: "https://rpc-mumbai.maticvigil.com/",
  chainId: 80001,
}

const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, {
  network: polygonNodeOptions,
})
magic.network = "matic"

export const maticWeb3 = new Web3(magic.rpcProvider)

export const checkUser = async () => {
  const isLoggedIn = await magic.user.isLoggedIn()
  if (isLoggedIn) {
    try {
      const { email, publicAddress } = await magic.user.getMetadata()
      return { isLoggedIn, email, publicAddress }
    } catch (error) {
      console.error(error)
    }
  }
  return null
}

export const login = async (email) => {
  // log in a user by their email
  try {
    console.log(`logging in with ${email}`)
    await magic.auth.loginWithMagicLink({ email })
  } catch (err) {
    console.error(err)
    if (err instanceof RPCError) {
      switch (err.code) {
        case RPCErrorCode.MagicLinkFailedVerification:
        case RPCErrorCode.MagicLinkExpired:
        case RPCErrorCode.MagicLinkRateLimited:
        case RPCErrorCode.UserAlreadyLoggedIn:
          console.error(err);
          // Handle errors accordingly :)
          break
        default:
          break
      }
    }
  }
}

export const logout = async () => {
  try {
    await magic.user.logout()
    console.log(await magic.user.isLoggedIn()) // => `false`
  } catch (error) {
    console.error(error)
  }
}

export async function fetchBalance(address) {
  const balance = maticWeb3.utils.fromWei(
    await maticWeb3.eth.getBalance(address) // Balance is in wei
  )
  return balance
}

export async function fetchAccounts() {
  const publicAddress = (await maticWeb3.eth.getAccounts())[0]
  return publicAddress
}

export async function send({ fromAddress, destination, amountToSend }) {
  // Convert ether/matic to wei
  const amount = maticWeb3.utils.toWei(amountToSend.toString())

  // Submit transaction to the blockchain and wait for it to be mined
  const receipt = await maticWeb3.eth.sendTransaction({
    from: fromAddress,
    to: destination,
    value: amount,
  })
  return receipt
}
