/** 
 * One-day summary returned in the `days` array 
 */
export interface Day {
  datetime:      string;
  datetimeEpoch: number;
  temp:          number;
  feelslike:     number;
  humidity:      number;
  precip:        number;
  conditions:    string;
}

/** 
 * One-hour summary returned in the `hours` array 
 */
export interface Hour {
  datetime:      string;
  datetimeEpoch: number;
  temp:          number;
  feelslike:     number;
  humidity:      number;
  precip:        number;
  conditions:    string;
}

/**
 * Full response from the Visual Crossing "Timeline" endpoint.
 */
export interface TimelineResponse {
  latitude:        number;
  longitude:       number;
  resolvedAddress: string;
  address:         string;
  timezone:        string;
  tzoffset:        number;
  description:     string;
  
  /** Always present */
  days:            Day[];
  
  /** Present only if `include=hours` */
  hours?:          Hour[];
}
