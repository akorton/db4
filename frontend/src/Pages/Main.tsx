import { RolesEnum, roleValueProps } from "../Utils";
import { Container } from "reactstrap";
import { Link, Navigate } from "react-router-dom";


const Main = ({ role }: roleValueProps) => {
    return (
        <>
            { role == RolesEnum.COMPANY && <Navigate to={'/company'} />}
            { role == RolesEnum.USER && <Navigate to={'/user'} />}
            { role == RolesEnum.DEVELOPER && <Navigate to={'/developer'} />}
            { role == RolesEnum.HR && <Navigate to={'/hr'} />}
            { !Object.keys(RolesEnum).includes(role) && <Navigate to={'/'}/>}
        </>
    );
}

export default Main;
