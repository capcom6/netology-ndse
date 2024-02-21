const PROVIDERS = {
    weatherstack: require("../providers/weatherstack").print_weather,
    openweathermap: require("../providers/openweathermap").print_weather,
};

function handler(args) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API key not found");
        process.exit(1);
    }

    const provider = PROVIDERS[args.provider];
    if (!provider) {
        console.error(`Unknown provider: ${args.provider}`);
        process.exit(1);
    }

    provider(apiKey, args.city);
}

module.exports.command = ["$0 <city>"];
module.exports.describe = "Show weather";
module.exports.builder = (yargs) => {
    yargs
        .positional("city", {
            describe: "City name",
            type: "string",
        })
        .option("provider", {
            describe: "Weather provider",
            type: "string",
            choices: Object.keys(PROVIDERS),
            default: "weatherstack",
        });


    return yargs;
};
module.exports.handler = handler;
