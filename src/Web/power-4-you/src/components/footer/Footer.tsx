import { Button, Modal } from "rsuite"
import "./footer.css"
import { memo, useState } from "react"

const Footer = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div className="flex-row border-radius centered footer">
            <Button appearance="subtle" className="margin-right-small">
                Imprint
            </Button>
            <Button appearance="subtle" onClick={handleOpen}>
                Contact
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    E-Mail Anbindung einbauen!!!
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} appearance="primary">
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default memo(Footer)