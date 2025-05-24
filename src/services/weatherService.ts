// This file defines TypeScript interfaces for the response from the Visual Crossing Weather API's "Timeline" endpoint.
import { TimelineResponse } from "../types/weatherResponse.js";
import axios from "axios";
import { redis } from "../index.js";

const BASE =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const TTL = Number(process.env.REDIS_TTL) || 3600; // Default TTL of 1 hour

export async function getTimelineForLocation(
  location: string
): Promise<TimelineResponse> {
  // Build URL
  const key = `weather:${location.toLocaleLowerCase()}`;

  // Check Redis cache first
  const cachedData = await redis.get(key);
  console.log(`Checking cache for ${location}...`);
  if (cachedData) {
    console.log(`Cache hit for ${location}`);
    return JSON.parse(cachedData) as TimelineResponse;
  }
  const url = `${BASE}/${encodeURIComponent(location)}`;

  // ⚙️ Here’s the magic: <TimelineResponse>
  const resp = await axios.get<TimelineResponse>(url, {
    params: {
      key: process.env.WEATHER_API_KEY,
      unitGroup: "metric",
      include: "current,days,hours",
      contentType: "json",
    },
  });

  // Cache the response in Redis
  await redis.setEx(key, TTL, JSON.stringify(resp.data))
  // resp.data is now strongly typed as TimelineResponse
  return resp.data;
}
