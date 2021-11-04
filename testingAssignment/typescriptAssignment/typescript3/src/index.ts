interface sampleProps {
  title: string;
  status: boolean;
  id: number;
}

interface nameProps {
  fName: string;
  lName?: string;
}

function getName({ fName, lName }: nameProps): string {
  if (lName) return fName + " " + lName;
  else return fName;
}
console.log(getName({ fName: "som" }));

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

let allPersons: personDetails[] = [];
const PhoneBook = (sample: personDetails): void => {
  allPersons.push(sample);
};

const sample: personDetails = {
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
