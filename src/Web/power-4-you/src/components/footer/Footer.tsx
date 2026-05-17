/* eslint-disable @typescript-eslint/no-explicit-any */
import "./footer.css"
import { memo } from "react"

const Footer = () => {
    return (
        <div className="flex-row border-radius footer">
            Imprint, Contact
        </div>
    )
}

export default memo(Footer)