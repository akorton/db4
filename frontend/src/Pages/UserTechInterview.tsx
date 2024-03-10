import { useEffect, useState } from "react";
import { TechInterview, TechInterviewEl } from "./HRTechInterviews";
import { Container } from "reactstrap";

const UserTechInterviews = ( { token, role }: {token: string, role: string} ) => {
    const [interviewsList, setInterviewsList] = useState<Array<TechInterview>>([]);
    useEffect(() => {
        fetch('/api/user/tech-interview', {
            headers: {Authorization: token}
        }).then(response => response.json())
        .then((data) => {
            setInterviewsList(data);
        });
    }, []);

    return (
        <Container>
            <h3 className="p-3 text-center">Technical interviews</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Date of interview</th>
                        <th>Interviewer login</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewsList && interviewsList.map(interview =>
                        <TechInterviewEl interview={interview} role={role} token={token}/>
                    )}
                </tbody>
            </table>
        </Container>
    )
}

export default UserTechInterviews;