import { memo, useEffect, useState } from "react"
import Header from './components/header/Header'
import ContentArea from './components/content-area/ContentArea'
import LoginAlert from './components/content-area/LoginAlert'
import Footer from "./components/footer/Footer"
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';
import type { Kunde, User } from "../generated/prisma"
import { getCustomer } from "./api/get/customer"
import { useToaster } from "rsuite"
import Toast from "./helper/Toast"
import { CustomProvider } from 'rsuite';


const modules = [AllCommunityModule];

const App = () => {
  const [user, setUser] = useState<null | User>(null)
  const [customer, setCustomer] = useState<undefined | Kunde>(undefined)
  const [loggedIn, setLoggedIn] = useState(false)
  const toaster = useToaster();

  useEffect(() => {
    if (!user) return;

    const fetchCustomerData = async () => {
      const { success, data, error } = await getCustomer(user.User_ID);
      if (!success) {
        const errorMessage = `Failed to fetch customer data: ${error}`;
        toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
      } else {
        setCustomer(data);
      }
    };

    fetchCustomerData();
  }, [user]);

  return (
    <CustomProvider>
      <AgGridProvider modules={modules}>
        <div className="canvas flex-column">
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} customerData={customer} />
          {loggedIn ? <ContentArea customerData={customer} /> : <LoginAlert />}
          <Footer />
        </div>
      </AgGridProvider>
    </CustomProvider>
  )
}

export default memo(App)