const getType = (sample) => {
    return sample.type;
};
const sampleUser = {
    type: "user",
    name: "bicky",
    age: 23,
    occupation: "student",
};
const sampleAdmin = {
    type: "admin",
    name: "som",
    age: 23,
    role: "student",
};
console.log(getType(sampleUser));
console.log(getType(sampleAdmin));
