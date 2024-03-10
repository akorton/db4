import { Link } from "react-router-dom"
import { Container } from "reactstrap"


export const Developer = () => {
    return (
        <Container className='start-page'>
            <Link to="tech-interview">Technical interviews</Link>
            <Link to="team-interview">Team interviews</Link>
        </Container>
    )
}

