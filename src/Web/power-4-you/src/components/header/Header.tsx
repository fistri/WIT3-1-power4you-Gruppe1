/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react"
import "./header.css"
import { Image, Button, Modal, Input, IconButton, Drawer } from "rsuite"
import login from "../../api/post/login"
import logout from "../../api/post/logout"
import { User } from "lucide-react"
import { customerData } from "../../helper/testData"
import ProfileOverview from "./ProfileOverview"

const Header = (
    {
        loggedIn,
        setLoggedIn,
        setUser
    }:
        {
            loggedIn: boolean,
            setLoggedIn: any,
            setUser: any
        }
) => {
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
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
                setUser(data.user)
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

    return (
        <div className="flex-row header border-radius margin-bottom-large">
            <Image src="../../../public/Power4YouLogo.png" alt="Power 4 You logo" height={40} />
            <div className="flex-row buttons">
                {renderLoginButton()}
                <IconButton icon={<User />} appearance="subtle" onClick={() => setDrawerOpen(true)} disabled={!loggedIn} />
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
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>{customerData.Nachname}, {customerData.Vorname} - {customerData.Kundennummer}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <ProfileOverview customer={customerData} />
                </Drawer.Body>
            </Drawer>
        </div>
    )
}

export default memo(Header)