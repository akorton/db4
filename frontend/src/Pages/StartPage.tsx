import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

const StartPage = () => {
    return (
        <Container className='start-page'>
            <Link to={"/login"}>Sign in</Link>
            <Link to={"/register"}>Sign up</Link>
        </Container>
    )
}

export default StartPage;
