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

const getType = (sample: User | Admin): string => {
  return sample.type;
};

const sampleUser: User = {
  type: "user",
  name: "bicky",
  age: 23,
  occupation: "student",
};

const sampleAdmin: Admin = {
  type: "admin",
  name: "som",
  age: 23,
  role: "student",
};

console.log(getType(sampleUser));
console.log(getType(sampleAdmin));
