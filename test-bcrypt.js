const bcrypt = require("bcryptjs");

// Test synchronous hashing
const password = "myPassword123";
const saltRounds = 10;

console.log("Original password:", password);

const hashedPassword = bcrypt.hashSync(password, saltRounds);
console.log("Hashed password:", hashedPassword);

// Test comparing passwords
const isMatch = bcrypt.compareSync(password, hashedPassword);
console.log("Password matches:", isMatch);

const wrongPassword = "wrongPassword";
const isWrongMatch = bcrypt.compareSync(wrongPassword, hashedPassword);
console.log("Wrong password matches:", isWrongMatch);
