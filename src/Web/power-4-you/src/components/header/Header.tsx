/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect } from "react"
import "./header.css"
import { Tab, Tabs, Image, Button, IconButton } from "rsuite"
import { Ellipsis } from "lucide-react"

const Header = (
    { 
        selectedTab, 
        setSelectedTab,
        loggedIn, 
        setLoggedIn
    }: 
    { 
        selectedTab: string, 
        setSelectedTab: any,
        loggedIn: boolean, 
        setLoggedIn: any
    }
) => {
    const renderLoginButton = () => {
        if (loggedIn) {
            return (
                <Button appearance="subtle" className="margin-right-small" onClick={() => setLoggedIn(!loggedIn)}>
                    Logout
                </Button>
            )
        } else {
            return (
                <Button appearance="subtle" className="margin-right-small" onClick={() => setLoggedIn(!loggedIn)}>
                    Login
                </Button>
            )
        }
    }

    const handleImageOnClick = () => {
        if (loggedIn) {
            setSelectedTab("content")
        }
    }

    useEffect(() => {
        if (!loggedIn) {
            setSelectedTab("")
        }
    }, [loggedIn, setSelectedTab])

    //TODO: If the user selects the Contact or Imprint tab and leaves it then the selected tab should automatically switch back to Content after login or to nothing if he is not logged

    return (
        <div className="flex-row header border-radius margin-bottom-large">
            <Image src="../../../public/Power4YouLogo.png" alt="Power 4 You logo" height={40} className={loggedIn ? "company-logo logo" : "logo"} onClick={handleImageOnClick} />
            <div className="navigation">
                <Tabs activeKey={selectedTab} onSelect={setSelectedTab} appearance="subtle">
                    <Tab title="Content" eventKey="content" disabled={!loggedIn} />
                    <Tab title="Contact" eventKey="contact" />
                    <Tab title="Imprint" eventKey="imprint" />
                </Tabs>
            </div>
            <div className="flex-row buttons">
                {renderLoginButton()}
                <IconButton appearance="subtle" icon={<Ellipsis />} disabled={!loggedIn} />
            </div>
        </div>
    )
}

export default memo(Header)