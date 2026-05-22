import { memo, useState } from "react";
import {
    Form,
    ButtonToolbar,
    Button,
    Textarea,
    toaster
} from "rsuite";
import Toast from "../../helper/Toast";

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

const ContactFormular = ({setOpen}: {setOpen: any}) => {

    const [formValue, setFormValue] = useState({
        subject: "",
        name: "",
        email: "",
        textarea: ""
    });

    const handleSubmit = async () => {

        if (!formValue.subject || !formValue.name || !formValue.email || !formValue.textarea) {
            toaster.push(<Toast message="Please fill in all fields." />, { placement: "topCenter" });
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
                    <Toast message="Failed to send the email. Please try again later." />,
                    { placement: "topCenter" }
                );
                return;
            }

            toaster.push(
                <Toast message={"The email has been sent successfully."} type="success"/>,
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
                <Toast message="Network Error: Server not reachable." />,
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
                    <Button appearance="default" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    );
};
export default memo(ContactFormular);