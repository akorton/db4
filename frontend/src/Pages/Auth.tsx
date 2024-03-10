import { Navigate } from "react-router-dom"
import { RolesEnum } from "../Utils"

type AuthProps = {
    role: string,
    allowedRoles: Array<string>,
    fallbackPage: string
}

type specificAuthProps = {
    role: string,
    fallbackPage: string
}


const Auth = ({ role, allowedRoles, fallbackPage }: AuthProps) => {
    return (
        <>{!allowedRoles.includes(role) && <Navigate to={fallbackPage}/>}</>
    )
}
export const AuthHR = ({ role, fallbackPage }: specificAuthProps) => {
    return <Auth role={role} allowedRoles={[RolesEnum.HR]} fallbackPage={fallbackPage} />
}
export const AuthDeveloper = ({ role, fallbackPage }: specificAuthProps) => {
    return <Auth role={role} allowedRoles={[RolesEnum.DEVELOPER]} fallbackPage={fallbackPage} />
}
export const AuthCompany = ({ role, fallbackPage }: specificAuthProps) => {
    return <Auth role={role} allowedRoles={[RolesEnum.COMPANY]} fallbackPage={fallbackPage} />
}
export const AuthUser = ({ role, fallbackPage }: specificAuthProps) => {
    return <Auth role={role} allowedRoles={[RolesEnum.USER]} fallbackPage={fallbackPage} />
}


export default Auth;

