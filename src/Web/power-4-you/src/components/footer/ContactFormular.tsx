import { memo, useState } from "react";
import {
    Form,
    ButtonToolbar,
    Button,
    Textarea,
    Notification,
    toaster
} from "rsuite";

const FormField = ({
    name,
    label,
    text,
    ...props
}) => (
    <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>

        <Form.Control
            name={name}
            {...props}
        />

        {text && (
            <Form.Text>{text}</Form.Text>
        )}
    </Form.Group>
);

const ContactFormular = () => {

    const [formValue, setFormValue] = useState({
        subject: "",
        name: "",
        email: "",
        textarea: ""
    });

    const handleSubmit = async () => {

        if (!formValue.subject || !formValue.name || !formValue.email || !formValue.textarea) {
            toaster.push(<Notification type="error">
                Please fill out all fields!
            </Notification>);
            return
        }

        try {

            const response = await fetch(
                "http://localhost:3000/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        subject: formValue.subject,
                        name: formValue.name,
                        email: formValue.email,
                        message: formValue.textarea
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                toaster.push(
                    <Notification type="error" header="Error">
                        The email failed to send, please try again later.
                    </Notification>,
                    { placement: "topCenter" }
                );
                return;
            }

            toaster.push(
                <Notification type="success" header="Success">
                    The email has been sent successfully.
                </Notification>,
                { placement: "topCenter" }
            );
            setFormValue({
                subject: "",
                name: "",
                email: "",
                textarea: ""
            });



        } catch (err) {
            toaster.push(
                <Notification type="error" header="Network Error">
                    Server not reachable.
                </Notification>,
                { placement: "topCenter" }
            );
            console.error(err);
        }
    };

    return (

        <Form
            fluid
            formValue={formValue}
            onChange={setFormValue}
            onSubmit={handleSubmit}
        >
            <FormField
                name="subject"
                label="Subject"
                text="Subject is required"
            />

            <FormField
                name="name"
                label="Username"
                text="Username is required"
            />
            <FormField
                name="email"
                label="Email"
                text="Email is required"
                type="email"
            />
            <FormField
                name="textarea"
                label="Textarea"
                accepter={Textarea}
                rows={8}
            />
            <Form.Group>
                <ButtonToolbar>
                    <Button
                        appearance="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button appearance="default">
                        Cancel
                    </Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    );
};
export default memo(ContactFormular);