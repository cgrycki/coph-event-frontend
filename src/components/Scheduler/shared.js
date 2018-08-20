/**
 * Shared functions for Schedule components
 */

import { utcParse, utcFormat } from 'd3-time-format';


export const parseAppTime = utcParse("%I:%M %p");
const mauiTimeParser = utcParse("%I:%M%p");
export const parseMauiTime = d => mauiTimeParser(d.trim());
export const formatTime = utcFormat("%I%p");

export const day_start  = parseAppTime("7:00 AM");
export const day_end    = parseAppTime("9:00 PM");