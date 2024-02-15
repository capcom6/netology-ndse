//@ts-check

const http = require("https");
const querystring = require("querystring");

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


/**
 * @param {string} apiKey
 * @param {string} city
 */
function print_weather(apiKey, city) {
    const params = {
        appid: apiKey,
        q: city,
        units: "metric",
    };

    const url = `${BASE_URL}?${querystring.stringify(params)}`;
    http
        .get(url, (response) => {
            let body = "";
            response.on("data", (chunk) => {
                body += chunk;
            });
            response.on("end", () => {
                if (response.statusCode !== 200) {
                    console.error("Request failed:", response.statusCode);
                    console.error(body);
                    process.exit(1);
                }

                const data = JSON.parse(body);
                if (data.cod !== 200) {
                    console.error("Received error:", data.message);
                    process.exit(1);
                }

                console.log(`Current weather in ${data.name}:`);
                console.log(`  Temperature: ${data.main.temp}°C feels like ${data.main.feels_like}°C`);
                console.log(`  Wind speed: ${data.wind.speed}m/s`);
                console.log(`  Humidity: ${data.main.humidity}%`);
                console.log(`  Pressure: ${data.main.pressure}hPa`);

                process.exit(0);

            });
        })
        .on("error", (error) => {
            console.error("Connection error:", error);
            process.exit(1);
        });
}

module.exports.print_weather = print_weather;
