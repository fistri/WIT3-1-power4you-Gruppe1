import getUserTest from './api/getUserTest'
import { memo, useState, useEffect } from "react"
import Header from './components/header/Header'
import NavBar from './components/nav-bar/NavBar'
import ContentArea from './components/content-area/ContentArea'
import LoginAlert from './components/content-area/LoginAlert'

const App = () => {
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("content")
  const [loggedIn, setLoggedIn] = useState(false) //TODO: implement login functionality
  const [selectedOverview, setSelectedOverview] = useState("dashboard")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserTest()
        setUser(data.user)
        setLoading(false)
      } catch (err) {
        console.error('Error:', err)
        setError('Fehler beim Laden des Users')
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="canvas flex-column">
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {loggedIn && <NavBar selectedOverview={selectedOverview} setSelectedOverview={setSelectedOverview} />}
      {loggedIn ? <ContentArea selectedOverview={selectedOverview} setSelectedOverview={setSelectedOverview} /> : <LoginAlert />}
    </div>
  )
}

export default memo(App)