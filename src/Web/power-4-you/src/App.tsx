import { memo, useEffect, useState } from "react"
import Header from './components/header/Header'
import ContentArea from './components/content-area/ContentArea'
import LoginAlert from './components/content-area/LoginAlert'
import Footer from "./components/footer/Footer"
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';
import type { Kunde, User } from "../generated/prisma"
import { getCustomer } from "./api/get/customer"

const modules = [AllCommunityModule];

const App = () => {
  const [user, setUser] = useState<null | User>(null)
  const [customer, setCustomer] = useState<undefined | Kunde>(undefined)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (!user) return;

    const fetchCustomerData = async () => {
      const { success, data, error } = await getCustomer(user.User_ID);
      if (!success) {
        //TODO add toasts
        console.error("Failed to fetch customer data:", error);
      } else {
        setCustomer(data);
      }
    };

    fetchCustomerData();
  }, [user]);

  return (
    <AgGridProvider modules={modules}>
      <div className="canvas flex-column">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} customerData={customer} />
        {loggedIn ? <ContentArea customerData={customer} /> : <LoginAlert />}
        <Footer />
      </div>
    </AgGridProvider>
  )
}

export default memo(App)