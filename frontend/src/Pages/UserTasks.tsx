import { useEffect, useState } from "react";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Input, Label } from "reactstrap";
import { defaultChange } from "../Utils";

type UserTasksProps = {
    token: string,

};

type Task = {
    problem_id: number,
    problem_text: string
}

const UserTasks = ( { token }: UserTasksProps ) => {
    const {id: contestId} = useParams();
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [taskPtr, setTaskPtr] = useState(0);
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/user/contest/${contestId}/tasks`, 
            {headers: {Authorization: token}})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setTasks(data);
        })
    }, []);

    const submitBtnHandler = () => {
        fetch(`/api/user/contest/${contestId}/tasks/${tasks[taskPtr].problem_id}/submit`, {
            method: "POST",
            headers: {Authorization: token, 'Content-Type': 'application/json'},
            body: answer
        });
    };

    return (
        <Container className="pt-10">
            <Container className="task-container">
                <h2 className="ml-3 mb-10">Task {taskPtr+1}</h2>
                <Button onClick={() => navigate(`results`)} className="mb-4">Finish contest</Button>
            </Container>
            <Container>
                <h3>Statement</h3>
                {tasks[taskPtr] && <p>{tasks[taskPtr].problem_text}</p>}
            </Container>
            <Container className="mt-10">
                <h3 className="mb-2">Answer</h3>
                <Input type="textarea" value={answer} onChange={defaultChange(setAnswer)}/>
                <Container>
                    <Button className="mr-3 mt-3" disabled={taskPtr===0} onClick={() => setTaskPtr(taskPtr - 1)}>{'<-'}</Button>
                    <Button onClick={submitBtnHandler} className="mt-3"> Submit answer</Button>
                    <Button className="ml-3 mt-3" disabled={taskPtr+1===tasks.length} onClick={() => setTaskPtr(taskPtr + 1)}>{'->'}</Button>
                </Container>
            </Container>
        </Container>
    )
}

export default UserTasks;

export const ContestResult = ( { token } : {token: string}) => {
    const {id: contestId} = useParams();
    const [tasksCnt, setTasksCnt] = useState(0);
    const [correctTasksCnt, setCorrectTasksCnt] = useState(0);

    useEffect(() => {
        fetch(`/api/user/contest/${contestId}/tasks`, 
            {headers: {Authorization: token}})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setTasksCnt(data.length);
        });

        fetch(`/api/user/contest/${contestId}/results`, 
            {headers: {Authorization: token}})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setCorrectTasksCnt(data);
        });
        
    }, []);

    return (
        <h1 className="pt-20 pl-20">
            Contest {correctTasksCnt * 2 > tasksCnt ? 'successfully passed' : 'failed'} with {correctTasksCnt}/{tasksCnt} tasks solved correctly.
        </h1>
    )
}
