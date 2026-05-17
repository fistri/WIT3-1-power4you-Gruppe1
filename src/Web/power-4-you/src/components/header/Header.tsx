/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from "react"
import "./header.css"
import { Tab, Tabs, Image, Button, Modal, Input } from "rsuite"
import login from "../../api/post/login"
import logout from "../../api/post/logout"

const Header = (
    {
        selectedOverview, 
        setSelectedOverview,
        loggedIn,
        setLoggedIn,
        setUser
    }:
        {
            selectedOverview: string,
            setSelectedOverview: any,
            loggedIn: boolean,
            setLoggedIn: any,
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
                console.log('Login successful:', data)
                setLoggedIn(true)
                setUser(data.user.username)
                setSelectedOverview("dashboard")
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
            setSelectedOverview("dashboard")
        }
    }

    useEffect(() => {
        if (!loggedIn) {
            setSelectedOverview("")
        }
    }, [loggedIn, setSelectedOverview])

    //TODO: If the user selects the Contact or Imprint tab and leaves it then the selected tab should automatically switch back to Content after login or to nothing if he is not logged

    return (
        <div className="flex-row header border-radius margin-bottom-large">
            <Image src="../../../public/Power4YouLogo.png" alt="Power 4 You logo" height={40} className={loggedIn ? "company-logo logo" : "logo"} onClick={handleImageOnClick} />
            <div className="navigation">
                <Tabs activeKey={selectedOverview} onSelect={setSelectedOverview} appearance="subtle">
                    <Tab title="Dashboard" eventKey="dashboard" disabled={!loggedIn} />
                    <Tab title="Storage" eventKey="storage" disabled={!loggedIn} />
                    <Tab title="Solar" eventKey="solar" disabled={!loggedIn} />
                </Tabs>
            </div>
            <div className="flex-row buttons">
                {renderLoginButton()}
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