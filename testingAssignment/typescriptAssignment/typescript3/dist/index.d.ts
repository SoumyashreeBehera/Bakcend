interface sampleProps {
    title: string;
    status: boolean;
    id: number;
}
interface nameProps {
    fName: string;
    lName?: string;
}
declare function getName({ fName, lName }: nameProps): string;
interface Address {
    houseNumber: number;
    street: string;
    city: string;
    state: string;
    postalCode: number;
    country: string;
}
interface personDetails {
    prefix?: string;
    phones: number[];
    address: Address[];
    email?: string;
    fName: string;
    lName: string;
    middleName?: string;
}
declare let allPersons: personDetails[];
declare const PhoneBook: (sample: personDetails) => void;
declare const sample: personDetails;
