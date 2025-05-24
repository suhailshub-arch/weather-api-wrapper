import { Request, Response } from "express";
import { getTimelineForLocation } from "../services/weatherService.js";

export async function getWeather(req: Request, res: Response) {
  // Extract the city from the request body
  const city: string | undefined = String(req.query.city);
  if (city === "undefined" || !city) {
    res.status(400).json({ error: "City is required" });
    return;
  }

  // Call the weather service to get the weather data
  try {
    const weatherData = await getTimelineForLocation(city);
    if (!weatherData) {
      res
        .status(404)
        .json({ error: "No weather data found for the specified city" });
      return;
    }

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(502).json({ error: "Failed to fetch weather data from API" });
    return;
  }
}
