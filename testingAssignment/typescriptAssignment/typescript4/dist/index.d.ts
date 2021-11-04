interface User {
    type: "user";
    name: string;
    age: number;
    occupation: string;
}
interface Admin {
    type: "admin";
    name: string;
    age: number;
    role: string;
}
declare const getType: (sample: User | Admin) => string;
declare const sampleUser: User;
declare const sampleAdmin: Admin;
