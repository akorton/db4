import { useState } from "react";
import { Button, Container, Form, Input, Label } from "reactstrap";
import { defaultChange, getRole, tokenSetterAndRoleSetterProps } from "../Utils";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setRole }: tokenSetterAndRoleSetterProps) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, isError] = useState(false);
    const navigate = useNavigate();

    const submitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const response = await fetch('api/login', {
            method: "POST",
            body: JSON.stringify({login: login, password: password}),
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) {
            isError(true);
        } else {
            let token = "Bearer ";
            await response.json()
                .then((data) => {
                    setToken(data.token);
                    token += data.token;
                });
            console.log(token);
            let role = await getRole(token);
            setRole(role);
            navigate('/main');
        }
    }
    return (
        <Container>
            <Form onSubmit={submitHandler} >
                <Container>
                    <Label htmlFor="login">Login</Label>
                    <Input id="login" onChange={defaultChange(setLogin)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" onChange={defaultChange(setPassword)} required={true}/>
                </Container>
                {error && <p className="error">Login or password is incorrent</p>}
                <Button className="mt-2 ml-3">Submit</Button>
            </Form>
        </Container>
    )
}

export default Login;
