import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Input } from "reactstrap";
import { defaultChange } from "../Utils";

const CommentPage = ( {token}: {token: string} ) => {
    const {interview_id: interviewId, task_id: taskId} = useParams();
    const [comment, setComment] = useState("");
    const [statement, setStatement] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/developer/problem/${taskId}/statement`, {headers: {Authorization: token}})
        .then((response) => {
            console.log(response);
            if (response.ok) return response.text();
        })
        .then((data) => {
            if (data) setStatement(data)
        });
        fetch(`/api/developer/tech-interview/${interviewId}/problem/${taskId}/comment`, {headers: {Authorization: token}})
        .then((response) => {
            if (response.ok) return response.text();
        })
        .then((data) => {
            if (data) setComment(data);
        });
    }, [])

    const updateHandler = () => {
        fetch(`/api/developer/tech-interview/${interviewId}/problem/${taskId}/comment`, {
            method: "POST",
            headers: {Authorization: token, 'Content-Type': 'application/json'},
            body: comment
        });
        navigate('/developer/tech-interview');
    }

    return (
        <Container>
            <Container>
                    <h3>Statement</h3>
                    {statement && <p>{statement}</p>}
            </Container>
            <Container>
                <h3>Comment</h3>
                <Input value={comment} onChange={defaultChange(setComment)}></Input>
                <Button onClick={updateHandler} className="mt-3">Update</Button>
            </Container>
        </Container>
    )
}


export default CommentPage;
