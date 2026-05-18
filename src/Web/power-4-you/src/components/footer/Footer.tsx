import { Button, Modal } from "rsuite"
import "./footer.css"
import { memo, useState } from "react"
import { Drawer } from 'rsuite'
import ContactFormular from "./ContactFormular"

const Footer = () => {
    const [open, setOpen] = useState(false)
    const [currentlyOpen, setCurrentlyOpen] = useState<"Imprint"|"Contact"|"">("")

    const handleOpenClick = (event : any) => {
        setOpen(true)
        setCurrentlyOpen(event.target.innerText)
    }

    return (
        <div className="flex-row border-radius centered footer">
            <Button appearance="subtle" className="margin-right-small" onClick={handleOpenClick}>
                Imprint
            </Button>
            <Button appearance="subtle" onClick={handleOpenClick}>
                Contact
            </Button>

            <Drawer open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>{currentlyOpen === "Imprint" ? "Imprint" : "Contact"}</Drawer.Title>
                </Drawer.Header>
                {currentlyOpen === "Imprint" ? <Drawer.Body>
                    <p>Anbieter:<br />Max Mustermann<br />Musterstraße 1<br />80999 München</p>
                    <p>Kontakt:<br />Telefon: 089/1234567-8<br />Telefax: 089/1234567-9<br />E-Mail: mail@mustermann.de<br />Website: www.mustermann.de</p>
                    <p> </p>
                    <p>Bei redaktionellen Inhalten:</p>
                    <p>Verantwortlich nach § 55 Abs.2 RStV<br />Moritz Schreiberling<br />Musterstraße 2<br />80999 München</p>
                </Drawer.Body> : <Drawer.Body>
                    <ContactFormular />
                </Drawer.Body>}
            </Drawer>
        </div>
    )
}

export default memo(Footer)