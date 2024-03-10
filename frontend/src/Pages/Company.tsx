import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import ContestEl, {Contest} from "./Contest";
import { Link } from "react-router-dom";

type CompanyProps = {
    token: string,
    role: string
}

export type Problem = {
    problem_id: number,
    problem_text: string,
    answer: string
}

const Company = ({ token, role }: CompanyProps) => {
    const [contestList, setContestList] = useState<Array<Contest>>([]);
    useEffect(() => {
        fetch('/api/company/contest', {
            headers: {Authorization: token}
        }).then(response => response.json())
        .then((data) => {
            setContestList(data);
        });
    }, []);
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
            <Link to={'/company/contest/add'}>Add new contest</Link>
        </Container>
    )
}

export default Company;
