import { Button, Modal } from "rsuite"
import "./footer.css"
import { memo, useState } from "react"

const Footer = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //TODO: Wie soll die E-Mail Anbindung gebaut sein?
    //TODO: Müssen wir ein Impressum erstellen?

    return (
        <div className="flex-row border-radius centered footer">
            <Button appearance="subtle" className="margin-right-small" href="imprint">
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