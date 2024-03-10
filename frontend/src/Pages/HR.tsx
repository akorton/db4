import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const HR = ( {token}: {token: string} ) => {
    return (
        <Container className='start-page'>
            <Link to={"tech-interview"}>Plan technical interview</Link>
            <Link to={"team-interview"}>Plan team interview</Link>
        </Container>
    )
}


export default HR;