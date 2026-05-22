/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useState } from "react"
import "./header.css"
import { Image, Button, Modal, Input, IconButton, Drawer, useToaster, useToaster } from "rsuite"
import { User } from "lucide-react"
import ProfileOverview from "./ProfileOverview"
import { logout } from "../../api/post/logout"
import { login } from "../../api/post/login"
import type { Kunde } from "../../../generated/prisma"
import Toast from "../../helper/Toast"

const Header = (
    {
        loggedIn,
        setLoggedIn,
        setUser,
        customerData
    }:
        {
            loggedIn: boolean,
            setLoggedIn: any,
            setUser: any,
            customerData: Kunde | undefined
        }
) => {
    const [open, setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const toaster = useToaster();

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const loginHandler = async (username: string, password: string) => {
        try {
            const { success, data, error } = await login(username, password)
            if (!success) {
                const errorMessage = `Login failed: ${error}`;
                toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
                return
            }
            if (data?.isLoggedIn) {
                setLoggedIn(true)
                setUser(data?.user)
                handleClose()
            }
            else {
                const errorMessage = `Login failed`;
                toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
            }
        } catch (err) {
            const errorMessage = `Login failed: ${err}`;
            toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
            setLoggedIn(false)
            setUser(null)
        }
    }

    const logoutHandler = async () => {
        try {
            const { success, data, error } = await logout()
            if (!success) {
                const errorMessage = `Logout failed: ${error}`;
                toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
                return
            }
            if (!data?.isLoggedIn) {
                setLoggedIn(false)
                setUser(null)
            }
            else {
                const errorMessage = `Logout failed`;
                toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
            }
        } catch (err) {
            const errorMessage = `Error logging out: ${err}`;
            toaster.push(<Toast message={errorMessage} />, { placement: "topCenter" });
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
                    <Drawer.Title>{customerData?.Nachname}, {customerData?.Vorname} - {customerData?.Kundennummer}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <ProfileOverview customer={customerData} />
                </Drawer.Body>
            </Drawer>
        </div>
    )
}

export default memo(Header)