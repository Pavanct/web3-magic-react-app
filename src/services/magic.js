import { Magic } from "magic-sdk"

const magic = new Magic("pk_live_7BA1D490E8474314")
export const checkUser = async () => {
  const isLoggedIn = await magic.user.isLoggedIn()
  if (isLoggedIn) {
    try {
      console.log(isLoggedIn)
      const { email, publicAddress } = await magic.user.getMetadata()
      return { isLoggedIn, email }
    } catch (error) {
      console.error(error)
    }
  }
}

export const login = async(email) => {
  // log in a user by their email
  try {
    console.log(`logging in with ${email}`)
    await magic.auth
      .loginWithMagicLink({ email })
  } catch (error) {
    console.error(error)
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
