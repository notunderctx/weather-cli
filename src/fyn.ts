#!/usr/bin/env node
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import inquirer from "inquirer";
import gradient from "gradient-string";
import { getWeather } from "weathers-watch";
import chalk from "chalk";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let city;

async function askPrompt() {
  const answers = await inquirer
    .prompt({
      name: "city",
      type: "input",
      message: "What city do you live in?",
      default: "London,united kindon",
    })
    .then(async (answers) => {
      city = answers.city;
      const c1 = city.split(",")[0];
      const v1 = city.split(",")[1];
      figlet(c1, (err, data) => {
        if (err) {
          console.error("Error rendering the city name:", err);
        } else {
          console.log(gradient.pastel.multiline(data));
        }
      });
      const weatherResult = await getWeather(c1, v1);
      console.log(chalk.bold.cyan(figlet.textSync(city)));

      console.log(chalk.yellow("Current Weather:"));
      console.log(
        chalk.blue(`Temperature: ${weatherResult.currentWeather.temperature}`)
      );
      console.log(
        chalk.blue(`Dew Point: ${weatherResult.currentWeather.dewPoint}`)
      );
      console.log(
        chalk.blue(`Barometer: ${weatherResult.currentWeather.barometer}`)
      );
      console.log(chalk.blue(`Wind: ${weatherResult.currentWeather.wind}`));
      console.log(
        chalk.blue(`Humidity: ${weatherResult.currentWeather.humidity}`)
      );
      console.log(
        chalk.blue(`Visibility: ${weatherResult.currentWeather.visibility}`)
      );
      console.log(chalk.blue(`Time: ${weatherResult.currentWeather.time}`));

      console.log(chalk.yellow("\nForecast Summary:"));

      console.log(chalk.yellow("\nForecast Details:"));
      weatherResult.forecastDetails.forEach((detail) => {
        console.log(chalk.green(detail.date));
        detail.results.forEach((result) => {
          console.log(chalk.blue(`- ${result}`));
        });
        console.log(chalk.grey("--------------------------------------------"));
      });
    });
}

if (process.argv[2] === null || process.argv[2] === " ") {
  // Handle the case where no command is provided
  console.log("No command provided.");
  process.exit(1);
}

if (process.argv[2] === "weather") {
  await askPrompt();
}
