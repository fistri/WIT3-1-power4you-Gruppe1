import Header from "./header/Header"
import NavBar from "./nav-bar/NavBar"
import ContentArea from "./content-area/ContentArea"

const CustomerView = () => {
    return (
        <div className="flex-column">
            <Header />
            <NavBar />
            <ContentArea />
        </div>
    )
}

export default CustomerView