import { useEffect, useState } from "react";
import { Button, Container, Input, Label } from "reactstrap";
import ContestEl, { Contest } from "./Contest";
import { defaultChange } from "../Utils";

type UserProps = {
    token: string,
    role: string
}

const UserContests = ({token, role} : UserProps) => {
    const [contestList, setContestList] = useState<Array<Contest>>([]);
    const [contestId, setContestId] = useState("");
    const [error, setError] = useState(false);

    const addContestHandler = () => {
        fetch(`/api/user/contest/add?id=${contestId}`, {
            headers: {Authorization: token},
        }).then(response => {
            if (!response.ok) {
                setError(true);
                return;
            }
            updateContests();
            setError(false);
        })
    }

    const updateContests = () => {
        fetch('/api/user/contest', {
            headers: {Authorization: token}
        }).then(response => response.json())
        .then((data) => {
            setContestList(data);
        });
    };

    useEffect(updateContests, []);
    return (
        <Container>
            <h3 className="p-3 text-center">Contests</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Contest name</th>
                        <th>Dates of contest</th>
                        <th>Number of problems</th>
                    </tr>
                </thead>
                <tbody>
                    {contestList && contestList.map(contest =>
                        <ContestEl contest={contest} role={role}/>
                    )}
                </tbody>
            </table>
            <Container>
                    <Label htmlFor="new-contest">Register for contest with id</Label>
                    <Input id="new-contest" type="number" onChange={defaultChange(setContestId)}/>
                    <Button onClick={addContestHandler} className="mt-3 mb-3">Register</Button>
            </Container>
            {error && <p className="error mt-3">Something went terribly wrong!</p>}
        </Container>
    )
}

export default UserContests;
