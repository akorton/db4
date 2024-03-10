import { Button, Container, Form, Input, Label } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RolesEnum, defaultChange } from "../Utils";

export type Contest = {
    contest_id: number,
    name: string,
    start_date: string,
    end_date: string,
    problem_ids: Array<number>
}

type ContestElProps = {
    contest: Contest,
    role: string
}

const ContestEl = ({ contest, role }: ContestElProps) => {
    return (
        <tr key={contest.contest_id}>
            <td>{contest.name}</td>
            <td>{contest.start_date} - {contest.end_date}</td>
            <td>{contest.problem_ids.length}</td>
            {role == RolesEnum.COMPANY && <td><Link to={`/company/contest/${contest.contest_id}`}>Link to edit</Link></td>}
            {role == RolesEnum.USER && <td><Link to={`/user/contest/${contest.contest_id}`}>Enter</Link></td>}
        </tr>
    )
}

type ContestEditProps = {
    token: string
};

export const ContestEditPage = ({ token }: ContestEditProps) => {
    const {id: contestId} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [problemIds, setProblemIds] = useState<Array<number>>([]);
    const [curProblemId, setCurProblemId] = useState("");
    useEffect(() => {
        if (contestId === undefined) return;
        fetch(`/api/company/contest/${contestId}`, {
            headers: {AUTHORIZATION: token}
        })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                navigate("/company");
                return;
            }
            response.json().then(data =>{
                setName(data.name);
                setStartDate(data.start_date);
                setEndDate(data.end_date);
                setProblemIds(data.problem_ids);
            })
        });
    }, []);

    const addProblemHandler = () => {
        fetch(`/api/company/problem/check?id=${curProblemId}`, {
            headers: {Authorization: token},
        }).then(response => {
            if (!response.ok || problemIds.includes(+curProblemId)) {
                setError(true);
                return;
            }
            setError(false);
            setProblemIds([...problemIds, +curProblemId]);
        })
    };

    const submitHandler: React.FormEventHandler<HTMLFormElement>  = (event) => {
        event.preventDefault();
        fetch('/api/company/contest/add', {
            method: "POST",
            headers: {Authorization: token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                contest_id: contestId,
                name: name,
                start_date: startDate,
                end_date: endDate,
                problem_ids: problemIds
            })
        }).then(response => {
            if (!response.ok) {
                setError(true);
                return;
            }
            navigate('/company');
        })
    }

    const deleteProblemIdSupplier = (id: number) => {
        return () => setProblemIds(problemIds.filter((val) => id !== val));
    }
    
    return (
        <Container>
            <Form onSubmit={submitHandler} >
                <Container>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={defaultChange(setName)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="startDate">Start date</Label>
                    <Input type="date" value={startDate} id="startDate" onChange={defaultChange(setStartDate)} required={true}/>
                </Container>
                <Container>
                    <Label htmlFor="endDate">End date</Label>
                    <Input type="date" value={endDate} id="endDate" onChange={defaultChange(setEndDate)} required={true}/>
                </Container>
                <Container>
                    <h4 className="mt-3 mb-3">Currently selected problems:</h4>
                    <ol>
                        {problemIds && problemIds.map(id => 
                        <li key={id}>
                            {id} <Button onClick={deleteProblemIdSupplier(id)}>Delete</Button>
                        </li>)}
                    </ol>
                </Container>
                <Container>
                    <Label htmlFor="problems">Add problem with id</Label>
                    <Input id="problems" type="number" onChange={defaultChange(setCurProblemId)}/>
                    <Button onClick={addProblemHandler} className="mt-3 mb-3">Add</Button>
                </Container>
                {error && <p className="error mt-3">Something went terribly wrong!</p>}
                <Button>Submit</Button>
            </Form>
        </Container>
    )
}

export default ContestEl;
