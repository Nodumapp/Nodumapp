import { format, parse, setHours, setMinutes } from "date-fns";


export function hhmmToDate(date, hhmm) {
const [h, m] = hhmm.split(":").map(Number);
return setMinutes(setHours(date, h), m);
}


export function dateToHHMM(date) {
return format(date, "HH:mm");
}


export function roundToInterval(date, interval = 30) {
const mins = date.getMinutes();
const delta = mins % interval;
const add = delta === 0 ? 0 : (interval - delta);
const rounded = new Date(date);
rounded.setMinutes(mins + add, 0, 0);
return rounded;
}


export function parseHHMM(str) {
return parse(str, 'HH:mm', new Date());
}