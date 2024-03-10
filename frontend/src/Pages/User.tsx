import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const User = () => {
    return (
        <Container className='start-page'>
            <Link to="contests">Contests</Link>
            <Link to="tech-interview">Technical interviews</Link>
            <Link to="team-interview">Team interviews</Link>
            <Link to="offer">Offers</Link>
        </Container>
    )
}

export default User;
