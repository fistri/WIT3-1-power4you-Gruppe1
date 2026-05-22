import { Notification } from 'rsuite';


const Toast = ({message, type = "error"}: {message: string, type?: "error" | "success"}) => {
    return (
        <Notification type={type} header="Error" closable>
            {message}
        </Notification>
    )
}

export default Toast;