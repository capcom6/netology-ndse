const fs = require("fs");
const readline = require("readline");

const HEADS = "heads";
const TAILS = "tails";

const MESSAGE_ANSWERS = "Please answer with 'heads'/'h'/'1' or 'tails'/'t'/'2'";
const MESSAGE_HEAD_TAILS = "Heads or tails? Ctrl+D to exit";

function normalizeAnswer(answer) {
    if (answer === "h" || answer === "heads" || answer === "1") {
        return HEADS;
    }

    if (answer === "t" || answer === "tails" || answer === "2") {
        return TAILS;
    }

    throw new Error(`Invalid answer. ${MESSAGE_ANSWERS}`);
}

function handler(args) {
    const logName = args.logFile;
    const logStream = fs.createWriteStream(logName, { flags: "a" });
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log(MESSAGE_HEAD_TAILS);
    console.log(MESSAGE_ANSWERS);

    let headsOrTail = Math.random() > 0.5 ? HEADS : TAILS;
    const gameRecord = {
        startedAt: new Date(),
        answeredAt: null,
        headsOrTail: headsOrTail,
        guess: null,
        win: false,
    };
    rl.on("line", (line) => {
        try {
            const guess = normalizeAnswer(line.trim().toLowerCase());

            gameRecord.answeredAt = new Date();
            gameRecord.guess = guess;

            if (guess === headsOrTail) {
                gameRecord.win = true;
                console.log("Correct!");
            } else {
                gameRecord.win = false;
                console.log("Wrong!");
            }

            logStream.write(JSON.stringify(gameRecord) + "\n");

            headsOrTail = Math.random() > 0.5 ? HEADS : TAILS;
            gameRecord.headsOrTail = headsOrTail;
            gameRecord.startedAt = new Date();

            console.log(MESSAGE_HEAD_TAILS);

        } catch (error) {
            console.error(error.message);
            return;
        }
    });

    rl.on("close", () => {
        console.log("Thank you for playing!");
        logStream.close();
        process.exit(0);
    });
}

module.exports.command = ["play", "$0"];
module.exports.describe = "Play game";
module.exports.builder = {};
module.exports.handler = handler;
