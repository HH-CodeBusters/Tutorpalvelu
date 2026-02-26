export type appUser = {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    zipcode: string;
    city: string;
    gender: string;
    school: string;
    tutor: boolean;
    parent: boolean;
    subjects?: { subjectname: string }[];
    id: number;
};
