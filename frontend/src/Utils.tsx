export const defaultChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    }
}

export type roleValueProps = {
    role: string
};

export type tokenSetterAndRoleSetterProps = {
    setToken: (t: string) => void,
    setRole: React.Dispatch<React.SetStateAction<string>>
};

export const getRole = async (token: string) => {
    return await fetch('api/role', {
        headers: {
            AUTHORIZATION: token
        }
    }).then((response) => response.text());
}

export const RolesEnum = {
    COMPANY: "COMPANY",
    USER: "USER",
    DEVELOPER: "DEVELOPER",
    HR: "HR"
}

export const HeadersEnum = {
    AUTHORIZATION: 'Authorization'
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
