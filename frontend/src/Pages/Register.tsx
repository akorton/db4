import { useState } from "react";
import { Button, Container, Form, Input, Label } from "reactstrap";
import { defaultChange, getRole, tokenSetterAndRoleSetterProps } from "../Utils";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken, setRole }: tokenSetterAndRoleSetterProps) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [role, setRoleLocal] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");

    const [error, isError] = useState(false);
    const navigate = useNavigate();

    const submitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const response = await fetch('api/register', {
            method: "POST",
            body: JSON.stringify({
                login: login,
                password: password,
                name: name,
                surname: surname,
                last_name: lastName,
                birthdate: birthdate,
                role: role,
                email: email,
                phone_number: phoneNumber,
                city: city
            }),
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
            let role = await getRole(token);
            setRole(role);
            navigate('/main');
        }
    }
    return (
        <Container>
            <Form onSubmit={submitHandler}>
                <Container>
                    <Label htmlFor="login">Login</Label>
                    <Input id="login" onChange={defaultChange(setLogin)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" onChange={defaultChange(setPassword)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" onChange={defaultChange(setName)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="surname">Surname</Label>
                    <Input id="surname" onChange={defaultChange(setSurname)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input id="last_name" onChange={defaultChange(setLastName)}/>
                </Container>
                <Container>
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input id="birthdate" type="date" onChange={defaultChange(setBirthdate)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" onChange={defaultChange(setRoleLocal)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" onChange={defaultChange(setEmail)}/>
                </Container>
                <Container>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input id="phone_number" onChange={defaultChange(setPhoneNumber)}/>
                </Container>
                <Container>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" onChange={defaultChange(setCity)}/>
                </Container>
                {error && (<p className="error">Something went terribly wrong!</p>)}
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default Register;
