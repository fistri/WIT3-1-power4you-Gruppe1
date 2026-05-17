/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react"
import "./header.css"
import { Tab, Tabs, Image, Button, IconButton, Modal, Input } from "rsuite"
import { Ellipsis } from "lucide-react"
import login from "../../api/post/login"
import logout from "../../api/post/logout"

const Header = (
    {
        selectedTab,
        setSelectedTab,
        loggedIn,
        setLoggedIn,
        user,
        setUser
    }:
        {
            selectedTab: string,
            setSelectedTab: any,
            loggedIn: boolean,
            setLoggedIn: any,
            user: string | null,
            setUser: any
        }
) => {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const loginHandler = async (username: string, password: string) => {
        try {
            const data = await login(username, password)
            console.log('Login response:', data)
            if (data.isLoggedIn) {
                setLoggedIn(true)
                setUser(data.user.Username)
                handleClose()
            }
            else {
                console.error('Login failed:', data)
            }
        } catch (err) {
            console.error('Error:', err)
            setLoggedIn(false)
            setUser(null)
        }
    }

    const logoutHandler = async () => {
        try {
            const data = await logout()
            if (!data.isLoggedIn) {
                setLoggedIn(false)
                setUser(null)
            }
            else {
                console.error('Logout failed:', data)
            }
        } catch (err) {
            console.error('Error:', err)
        }
    }

    const renderLoginButton = () => {
        if (loggedIn) {
            return (
                <Button appearance="subtle" className="margin-right-small" onClick={logoutHandler}>
                    Logout
                </Button>
            )
        } else {
            return (
                <Button appearance="subtle" className="margin-right-small" onClick={handleOpen}>
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
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input placeholder="Username" className="margin-bottom-small" value={username} onChange={(event) => setUsername(event)} />
                    <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                    <Button appearance="primary" onClick={() => loginHandler(username, password)}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default memo(Header)