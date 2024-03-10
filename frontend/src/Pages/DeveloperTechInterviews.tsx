import { useEffect, useState } from "react";
import { TechInterview, TechInterviewEl } from "./HRTechInterviews";
import { Container } from "reactstrap";

const DeveloperTechInterviews = ( { token, role }: {token: string, role: string} ) => {
    const [interviewsList, setInterviewsList] = useState<Array<TechInterview>>([]);
    const updateAll = () => {
        fetch('/api/developer/tech-interview', {
            headers: {Authorization: token}
        }).then(response => response.json())
        .then((data) => {
            console.log(data);
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
        </Container>
    )
}

export default DeveloperTechInterviews;
