import { memo, useState } from "react"
import Header from './components/header/Header'
import ContentArea from './components/content-area/ContentArea'
import LoginAlert from './components/content-area/LoginAlert'
import Footer from "./components/footer/Footer"

const App = () => {
  const [user, setUser] = useState<string | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedOverview, setSelectedOverview] = useState("dashboard")

  return (
    <div className="canvas flex-column">
      <Header selectedOverview={selectedOverview} setSelectedOverview={setSelectedOverview} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
      {loggedIn ? <ContentArea selectedOverview={selectedOverview} setSelectedOverview={setSelectedOverview} /> : <LoginAlert />}
      {loggedIn && <Footer />}
    </div>
  )
}

export default memo(App)