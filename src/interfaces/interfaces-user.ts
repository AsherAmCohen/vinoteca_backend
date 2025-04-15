export interface SignUpServiceProps {
    name: string;
    lastname: string;
    gender: string;
    email: string;
    address: string;
    phone: string;
    birthdate: string;
    password: string;
}

export interface SignUpQueryProps {
    name: string;
    lastname: string;
    gender: string;
    email: string;
    address: string;
    phone: number;
    birthdate: Date;
    password: string;
}