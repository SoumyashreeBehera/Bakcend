function getName({ fName, lName }) {
    if (lName)
        return fName + " " + lName;
    else
        return fName;
}
console.log(getName({ fName: "som" }));
let allPersons = [];
const PhoneBook = (sample) => {
    allPersons.push(sample);
};
const sample = {
    phones: [9861],
    address: [
        {
            houseNumber: 999,
            street: "cdr",
            city: "ctc",
            state: "odisha",
            postalCode: 754025,
            country: "india",
        },
    ],
    fName: "som",
    lName: "behera",
};
PhoneBook(sample);
console.log(allPersons);
console.log(allPersons[0].address);
