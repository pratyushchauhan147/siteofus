import { SessionProvider } from "next-auth/react"
import './styles/Login.css'
import './styles/LeftSideBar.css'
import './styles/feed.css'
import '../pages/styles/modal.css'
import './styles/feed-mobile.css'
import {AppContextProvider } from "../context/AppContext"
function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}

export default MyApp