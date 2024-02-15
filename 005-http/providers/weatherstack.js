//@ts-check

const http = require("http");
const querystring = require("querystring");

const BASE_URL = "http://api.weatherstack.com/current";

/**
 * @param {string} apiKey
 * @param {string} city
 */
function print_weather(apiKey, city) {
    const params = {
        access_key: apiKey,
        query: city,
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
                if (data.error) {
                    console.error("Received error:", data.error.info);
                    process.exit(1);
                }

                console.log(`Current weather in ${data.location.name}:`);
                console.log(`  Temperature: ${data.current.temperature}°C feels like ${data.current.feelslike}°C`);
                console.log(`  Wind speed: ${data.current.wind_speed}m/s`);
                console.log(`  Humidity: ${data.current.humidity}%`);
                console.log(`  Pressure: ${data.current.pressure}hPa`);

                process.exit(0);
            });
        })
        .on("error", (error) => {
            console.error("Connection error:", error);
            process.exit(1);
        });
}

module.exports.print_weather = print_weather;
