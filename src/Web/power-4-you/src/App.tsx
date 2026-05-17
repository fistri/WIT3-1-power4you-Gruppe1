import { memo, useState } from "react"
import Header from './components/header/Header'
import NavBar from './components/nav-bar/NavBar'
import ContentArea from './components/content-area/ContentArea'
import LoginAlert from './components/content-area/LoginAlert'

const App = () => {
  const [user, setUser] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("content")
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedOverview, setSelectedOverview] = useState("dashboard")

  return (
    <div className="canvas flex-column">
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
      {loggedIn && <NavBar selectedOverview={selectedOverview} setSelectedOverview={setSelectedOverview} />}
      {loggedIn ? <ContentArea selectedOverview={selectedOverview} setSelectedOverview={setSelectedOverview} /> : <LoginAlert />}
    </div>
  )
}

export default memo(App)