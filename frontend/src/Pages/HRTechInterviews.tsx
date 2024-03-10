import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Container, Input, Label } from "reactstrap"
import { RolesEnum, defaultChange, sleep } from "../Utils";
import { useEffect, useState } from "react";

export const TechInterviewEl = ({ interview, role, token, updateAll }: {interview: TechInterview, role: string, token: string, updateAll?: any}) => {
    const [problem, setProblem] = useState("");
    const updateStatus = (status: boolean) => {
        fetch(`/api/tech-interview/${interview.id}/status`, {
            method: "POST",
            headers: {Authorization: token, 'Content-Type': 'application/json'},
            body: JSON.stringify(status)
        }).then(() => {
            sleep(200);
            updateAll()
        });
    }
    const addProblem = (idx: number) => {
        fetch(`/api/developer/tech-interview/${interview.id}/add`, {
            method: "POST",
            headers: {Authorization: token, 'Content-Type': 'application/json'},
            body: JSON.stringify(idx)
        }).then(() => {
            sleep(200);
            updateAll();
        });
    }
    return (
        <tr>
            {role != RolesEnum.USER && <td>{interview.login}</td>}
            <td>{interview.date}</td>
            {role != RolesEnum.DEVELOPER && <td>{interview.interviewer}</td>}
            {role == RolesEnum.HR && <td>{interview.tasks.join(", ")}</td>}
            {role == RolesEnum.DEVELOPER && <td>
                {interview.tasks.map(t => <Link to={`${interview.id}/task/${t}/comment`}>{t}<br/></Link>) }
                <Label>Add task with id:</Label>
                <Input type="number" value={problem} onChange={defaultChange(setProblem)}></Input>
                <Button className="mt-2" onClick={() => addProblem(+problem)}>Add</Button>
                </td>}
            <td>
                <Container className="tech-interview-result">
                    {interview.result ? "Success" : "Fail"}
                    {(role == RolesEnum.DEVELOPER || role == RolesEnum.HR) && <Button onClick={() => updateStatus(true)}>Approve</Button>}
                    {(role == RolesEnum.DEVELOPER || role == RolesEnum.HR) && <Button onClick={() => updateStatus(false)}>Fail</Button>}
                </Container>
            </td>
        </tr>
    )
}

export type TechInterview = {
    id: number,
    login: string,
    date: string,
    interviewer: string,
    tasks: Array<number>,
    result: boolean
};

const HRTechInterviews = ( { token, role }: {token: string, role: string} ) => {
    const [interviewsList, setInterviewsList] = useState<Array<TechInterview>>([]);
    const updateAll = () => {
        fetch('/api/hr/tech-interview', {
            headers: {Authorization: token}
        }).then(response => response.json())
        .then((data) => {
            setInterviewsList(data);
        });
    };
    useEffect(updateAll, []);

    return (
        <Container>
            <h3 className="p-3 text-center">Technical interviews</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Interviewee login</th>
                        <th>Date of interview</th>
                        <th>Interviewer login</th>
                        <th>Tasks ids</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewsList && interviewsList.map(interview =>
                        <TechInterviewEl interview={interview} role={role} token={token} updateAll={updateAll}/>
                    )}
                </tbody>
            </table>
            <Link to={'add'}>Add new interview</Link>
        </Container>
    )
}

export default HRTechInterviews;

export const HRPlanTechInterview = ( {token} : {token: string} ) => {
    const [error, setError] = useState(false);
    const [login, setLogin] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    
    const submitHandler: React.FormEventHandler<HTMLFormElement>  = (event) => {
        event.preventDefault();
        fetch('/api/hr/tech-interview/add', {
            method: "POST",
            headers: {Authorization: token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                login: login,
                date: date,
                id: id
            })
        }).then(response => {
            if (!response.ok) {
                setError(true);
                return;
            }
            navigate('/hr/tech-interview');
        })
    }

    return (
        <Container>
            <Form onSubmit={submitHandler} className="pt-10" >
                <Container>
                    <Label htmlFor="login">Interviewee login</Label>
                    <Input id="login" value={login} onChange={defaultChange(setLogin)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" value={date} id="date" onChange={defaultChange(setDate)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="id">Interviewer login</Label>
                    <Input value={id} id="id" onChange={defaultChange(setId)} required={true}/>
                </Container>
                {error && <p className="error mt-3">Something went terribly wrong!</p>}
                <Button className="ml-5 mt-3">Submit</Button>
            </Form>
        </Container>
    )
}
