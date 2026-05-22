import { Notification } from 'rsuite';


const Toast = ({message}: {message: string}) => {
    return (
        <Notification type="error" header="Error">
            {message}
        </Notification>
    )
}

export default Toast;