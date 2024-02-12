const readline = require("readline");

const MAX_NUMBER = 100;
const number = Math.floor(Math.random() * MAX_NUMBER);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(`Guess a number from 0 to ${MAX_NUMBER}`);

rl.on("line", (line) => {
    const guess = Number(line);
    if (isNaN(guess)) {
        console.log("Please enter a number");
        return;
    }

    if (guess > MAX_NUMBER) {
        console.log(`Please enter a number from 0 to ${MAX_NUMBER}`);
        return;
    }

    if (guess === number) {
        console.log("Correct!");
        rl.close();
        return;
    }

    if (guess < number) {
        console.log("Too low");
    } else {
        console.log("Too high");
    }
});

rl.on("close", () => {
    console.log(`The number was ${number}`);
    process.exit(0);
});