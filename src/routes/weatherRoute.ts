import { Router, Request, Response } from "express";
import { getWeather } from "../handlers/weatherHandler.js";

const weatherRouter = Router();

// Define a route to get weather data
weatherRouter.get("/", getWeather);

export default weatherRouter;
