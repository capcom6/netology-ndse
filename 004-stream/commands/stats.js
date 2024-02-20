const fs = require("fs");

function handler(args) {
    const logName = args.logFile;
    if (!fs.existsSync(logName)) {
        console.log(`File ${logName} not found`);
        process.exit(1);
    }

    const logStream = fs.createReadStream(logName, { encoding: "utf-8", highWaterMark: 128 });

    const stats = {
        games: 0,
        wins: 0,
    };
    let line = "";
    logStream.on("data", (chunk) => {
        const str = chunk.toString();
        const lines = str.split("\n");
        if (lines.length === 1) {
            line += lines[0];
            return;
        }

        while (lines.length > 1) {
            const data = JSON.parse(line + lines.shift());

            stats.games++;
            if (data.win) {
                stats.wins++;
            }
            line = "";
        }

        line += lines[0];
    });

    logStream.on("end", () => {
        console.log("Game statistics");
        console.log(`Log file: ${logName}\n`);

        console.log(`Games played:\t${stats.games}`);
        console.log(`Games won:\t${stats.wins}`);
        console.log(`Win rate:\t${Math.floor(stats.wins * 100 / stats.games)}%`);
    });
}

module.exports.command = ["stats"];
module.exports.describe = "Print stats";
module.exports.builder = {};
module.exports.handler = handler;
