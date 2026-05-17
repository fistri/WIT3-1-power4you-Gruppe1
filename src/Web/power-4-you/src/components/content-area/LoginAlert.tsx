import { memo } from "react"
import "./content-area.css"

const LoginAlert = () => {
    return (
        <div className="flex-column centered height-full">
            <div className="login-alert">
                Please log in to access the content.
            </div>
        </div>
    )
}

export default memo(LoginAlert)