import { memo } from "react"
import { Card, Text } from "rsuite"

const ProfileOverview = ({customer}: {customer: any}) => {
  return (
    <div className="flex-column">
        <Card className="margin-bottom-large">
          <Card.Header>
            <Text size="lg">Address</Text>
          </Card.Header>
            <Card.Body>
                <p>{customer.Strasse} {customer.Hausnummer}</p>
                <p>{customer.Postleitzahl}, {customer.Ort}</p>
            </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Text size="lg">Contact</Text>
          </Card.Header>
            <Card.Body>
                <p>{customer.Email}</p>
                <p>{customer.Telefonnummer}</p>
            </Card.Body>
        </Card>
    </div>
  )
}

export default memo(ProfileOverview)