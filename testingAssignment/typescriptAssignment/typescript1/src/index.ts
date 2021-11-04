let fname: string;
fname = "som";
let age: number;
age = 25;
let isFetching: boolean;
isFetching = true;
let numArr: number[] = [12, 2, 3];
console.log(numArr);

let strArr: string[] = ["a", "b"];

let tuple: [string, boolean] = ["som", true];

enum people {
  User,
  SuperUser,
  Admin,
  SuperAdmin,
}

function product(x: number, y: number): number {
  return x * y;
}
console.log(product(2, 3));

function divide(x: number, y: number): number {
  return x / y;
}

function printName(x: string): void {
  console.log(x);
}
printName(fname);
