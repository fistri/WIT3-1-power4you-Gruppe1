import { memo, useState } from "react"
import Header from './components/header/Header'
import ContentArea from './components/content-area/ContentArea'
import LoginAlert from './components/content-area/LoginAlert'
import Footer from "./components/footer/Footer"
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';

const modules = [AllCommunityModule];

const App = () => {
  const [user, setUser] = useState<null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedOverview, setSelectedOverview] = useState<"solar" | "profile">("solar")

  return (
    <AgGridProvider modules={modules}>
      <div className="canvas flex-column">
        <Header selectedOverview={selectedOverview} setSelectedOverview={setSelectedOverview} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
        {loggedIn ? <ContentArea selectedOverview={selectedOverview} /> : <LoginAlert />}
        {loggedIn && <Footer />}
      </div>
    </AgGridProvider>
  )
}

export default memo(App)