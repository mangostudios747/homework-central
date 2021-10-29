//import chroma from "chroma-js";

export const tags = {
  hw: {
    name: "Homework",
    color: {
      dark: "#1297a3",
      light: "#66d9e3",
    },
  },
  reading: {
    name: "Reading",
    color: {
      dark: "#5b33cb",
      light: "#4a11d7",
    },
  },
  tst: {
    name: "Test",
    color: {
      dark: "#bd493e",
      light: "#e37166",
    },
  },
  lab: {
    name: "Lab",
    color: {
      dark: "#5c8723",
      light: "#aad66f",
    },
  },
  project: {
    name: "Project",
    color: {
      dark: "#e54fa6",
      light: "#9d075e",
    },
  },
};

export const colors = {
  blue: "#007bff",
  indigo: "#6610f2",
  purple: "#6f42c1",
  pink: "#e83e8c",
  orange: "#fd7e14",
  primary: "#007bff",
  secondary: "#707b85",
  success: "#28a745",
  info: "#17a2b8",
  warning: "#ffc107",
  danger: "#dc3545",
  light: "#f8f9fa",
  dark: "#343a40",
};

const colourtoy = document.createElement("div");

export function isLight(colour) {
  colourtoy.style.backgroundColor = colour;
  colour = colourtoy.style.backgroundColor;
  colour = colour
    .slice(colour.indexOf("(") + 1, colour.indexOf(")"))
    .split(/,\s*/)
    .map((a) => +a);
  // https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
  return (
    Math.round(
      (parseInt(colour[0]) * 299 +
        parseInt(colour[1]) * 587 +
        parseInt(colour[2]) * 114) /
        1000
    ) > 150
  );
}

export const schedColors = [
  {
    name: "Atomic Tangerine",
    hex: "ff934f",
    rgb: [255, 147, 79],
    cmyk: [0, 42, 69, 0],
    hsb: [23, 69, 100],
    hsl: [23, 100, 65],
    lab: [71, 35, 53],
  },
  {
    name: "Minion Yellow",
    hex: "fde74c",
    rgb: [253, 231, 76],
    cmyk: [0, 9, 70, 1],
    hsb: [53, 70, 99],
    hsl: [53, 98, 65],
    lab: [91, -9, 74],
  },
  {
    name: "Bud Green",
    hex: "86b455",
    rgb: [134, 180, 85],
    cmyk: [26, 0, 53, 29],
    hsb: [89, 53, 71],
    hsl: [89, 39, 52],
    lab: [68, -31, 43],
  },
  {
    name: "Skobeloff",
    hex: "006c67",
    rgb: [0, 108, 103],
    cmyk: [100, 0, 5, 58],
    hsb: [177, 100, 42],
    hsl: [177, 100, 21],
    lab: [41, -27, -5],
  },
  {
    name: "Electric Blue",
    hex: "7ae1e1",
    rgb: [122, 225, 225],
    cmyk: [46, 0, 0, 12],
    hsb: [180, 46, 88],
    hsl: [180, 63, 68],
    lab: [84, -30, -9],
  },
  {
    name: "Aero",
    hex: "80b8ef",
    rgb: [128, 184, 239],
    cmyk: [46, 23, 0, 6],
    hsb: [210, 46, 94],
    hsl: [210, 78, 72],
    lab: [73, -4, -33],
  },
  {
    name: "Medium Slate Blue",
    hex: "7765e3",
    rgb: [119, 101, 227],
    cmyk: [48, 56, 0, 11],
    hsb: [249, 56, 89],
    hsl: [249, 69, 64],
    lab: [50, 39, -62],
  },
  {
    name: "White",
    hex: "fefffe",
    rgb: [254, 255, 254],
    cmyk: [0, 0, 0, 0],
    hsb: [120, 0, 100],
    hsl: [120, 100, 100],
    lab: [100, 0, 0],
  },
  {
    name: "Oxford Blue",
    hex: "1b263b",
    rgb: [27, 38, 59],
    cmyk: [54, 36, 0, 77],
    hsb: [219, 54, 23],
    hsl: [219, 37, 17],
    lab: [15, 2, -15],
  },
  {
    name: "Popstar",
    hex: "ce4760",
    rgb: [206, 71, 96],
    cmyk: [0, 66, 53, 19],
    hsb: [349, 66, 81],
    hsl: [349, 58, 54],
    lab: [50, 55, 15],
  },
].map((k) => {
  k.hex = "#" + k.hex;
  return k;
});

export const dclasses = [
  {
    name: "Period 1",
    hcname: "Period 1",
    color: schedColors[0], //'#f57364',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Period 2",
    hcname: "Period 2",
    color: schedColors[1], //'#f29735',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Period 3",
    hcname: "Period 3",
    color: schedColors[2], //'#f2c935',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Period 4",
    hcname: "Period 4",
    color: schedColors[3], //'#40c950',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Period 5",
    hcname: "Period 5",
    color: schedColors[4], //'#40a3c9',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Period 6",
    hcname: "Period 6",
    color: schedColors[5], //'#a85fe3',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Period 7",
    hcname: "Period 7",
    color: schedColors[6], //'#c761a5',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Period 8",
    hcname: "Period 8",
    color: schedColors[7], //'#61c7b1',
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "PRIME",
    hcname: "Period 9",
    color: schedColors[8], //colors.dark,
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "Lunch",
    hcname: "Lunch",
    color: schedColors[8],
    teacher: "",
    completed: [],
    assignments: [],
  },
  {
    name: "SELF",
    hcname: "SELF",
    color: schedColors[8], //colors.secondary,
    teacher: "",
    completed: [],
    assignments: [],
  },
];

export const CALIFORNIA_UTC_OFFSET = 420;
// India has a timezone offset of -330  (i think UTC time is GMT time??)
// this is a difference of 810
// if the actual time difference is 13:30
// then that is 13*60 + 30 = 600 + 180 + 30 = 810, so its minutes!
export function mod(a, n) {
  return ((a % n) + n) % n;
}

export function getTotalMinutes(d = new Date()) {
  return d.getMinutes() + d.getHours() * 60;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.addHours = function (hrs) {
  let date = new Date(this.valueOf());
  date.setHours(date.getHours() + hrs);
  return date;
};

Date.prototype.addMinutes = function (hrs) {
  let date = new Date(this.valueOf());
  date.setMinutes(date.getMinutes() + hrs);
  return date;
};

Date.prototype.clearSeconds = function () {
  this.setSeconds(0);
  this.setMilliseconds(0);
};

export function timeInCA() {
  const localTime = new Date();
  return localTime.addMinutes(
    0 - CALIFORNIA_UTC_OFFSET + localTime.getTimezoneOffset()
  );
}

export function toLocalTime(when) {
  const localTime = new Date();
  return when.addMinutes(
    0 - localTime.getTimezoneOffset() + CALIFORNIA_UTC_OFFSET
  );
}

export const theSchedule = {
  holidays: {
    "8-7-2020": "Labor Day",
    "10-11-2020": "Veteran's Day",
    "10-23-2020": "Thanksgiving Break",
    "10-24-2020": "Thanksgiving Break",
    "10-25-2020": "Thanksgiving Break",
    "10-26-2020": "Thanksgiving Break",
    "10-27-2020": "Thanksgiving Break",
    "11-21-2020": "Winter Break",
    "11-22-2020": "Winter Break",
    "11-23-2020": "Winter Break",
    "11-24-2020": "Winter Break",
    "11-25-2020": "Winter Break",
    "11-26-2020": "Winter Break",
    "11-27-2020": "Winter Break",
    "11-28-2020": "Winter Break",
    "11-29-2020": "Winter Break",
    "11-30-2020": "Winter Break",
    "11-31-2020": "Winter Break",
    "0-1-2021": "Winter Break",
    "0-2-2021": "Winter Break",
    "0-3-2021": "Winter Break",
    "0-4-2021": "Winter Break",
    "0-5-2021": "Winter Break",
    "0-6-2021": "Winter Break",
    "0-7-2021": "Winter Break",
  },
  vacations: {},
  overrides: {
    "7-17-2020": [
      { name: "Assembly", start: [10, 0], end: [11, 0] },
      { name: "Period 1", start: [11, 10], end: [11, 30] },
      { name: "Period 2", start: [11, 40], end: [12, 0] },
      { name: "Period 3", start: [12, 10], end: [12, 30] },
      { name: "Lunch", start: [12, 30], end: [13, 0] },
      { name: "Period 4", start: [13, 10], end: [13, 35] },
      { name: "Period 5", start: [13, 45], end: [14, 5] },
      { name: "Period 6", start: [14, 15], end: [14, 35] },
      { name: "Period 7", start: [14, 45], end: [15, 5] },
      { name: "Period 8", start: [15, 15], end: [15, 35] },
    ],
    "7-19-2020": [
      { name: "Period 5", start: [9, 40], end: [10, 55] },
      { name: "Go to Period 5", start: [11, 5], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 6", start: [12, 20], end: [13, 35] },
      { name: "Period 7", start: [13, 45], end: [15, 0] },
    ],
    "8-2-2020": [
      { name: "Period 5", start: [9, 40], end: [10, 55] },
      { name: "SELF", start: [11, 5], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 6", start: [12, 20], end: [13, 40] },
      { name: "Period 7", start: [13, 50], end: [15, 5] },
    ],
    "8-4-2020": [
      { name: "Collab/Prep", start: [8, 30], end: [9, 35] },
      { name: "Period 5", start: [9, 40], end: [10, 45] },
      { name: "Period 6", start: [10, 55], end: [12, 5] },
      { name: "Period 7", start: [12, 15], end: [1, 20] },
    ],
    "10-9-2020": [
      { name: "Period 1", start: [9, 0], end: [10, 15] },
      { name: "Period 2", start: [10, 25], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 3", start: [12, 20], end: [13, 40] },
      { name: "Period 4", start: [13, 50], end: [15, 5] },
      { name: "Period 8", start: [15, 45], end: [17, 0] },
    ],
    "10-10-2020": [
      { name: "Period 5", start: [9, 40], end: [10, 55] },
      { name: "SELF", start: [11, 5], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 6", start: [12, 20], end: [13, 40] },
      { name: "Period 7", start: [13, 50], end: [15, 5] },
    ],
    "11-18-2020": [
      { name: "Period 5", start: [9, 40], end: [10, 45] },
      { name: "Period 6", start: [10, 55], end: [12, 5] },
      { name: "Period 7", start: [12, 15], end: [13, 20] },
    ],
    "11-16-2020": [
      { name: "Period 5", start: [9, 40], end: [10, 55] },
      { name: "SELF", start: [11, 5], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 6", start: [12, 20], end: [13, 40] },
      { name: "Period 7", start: [13, 50], end: [15, 5] },
    ],
  },
  defaults: [
    null,
    [
      { name: "Period 1", start: [10, 0], end: [10, 30] },
      { name: "Period 2", start: [10, 40], end: [11, 10] },
      { name: "Period 3", start: [11, 20], end: [11, 50] },
      { name: "Period 4", start: [12, 0], end: [12, 35] },
      { name: "Lunch", start: [12, 35], end: [13, 5] },
      { name: "Period 5", start: [13, 15], end: [13, 45] },
      { name: "Period 6", start: [13, 55], end: [14, 25] },
      { name: "Period 7", start: [14, 35], end: [15, 5] },
      { name: "Period 8", start: [15, 45], end: [16, 15] },
    ],
    [
      { name: "Period 1", start: [9, 0], end: [10, 15] },
      { name: "Period 2", start: [10, 25], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 3", start: [12, 20], end: [13, 40] },
      { name: "Period 4", start: [13, 50], end: [15, 5] },
      { name: "Period 8", start: [15, 45], end: [17, 0] },
    ],
    [
      { name: "Period 5", start: [9, 40], end: [10, 55] },
      { name: "Gunn Together", start: [11, 5], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 6", start: [12, 20], end: [13, 40] },
      { name: "Period 7", start: [13, 50], end: [15, 5] },
    ],
    [
      { name: "Period 1", start: [9, 0], end: [10, 15] },
      { name: "Period 2", start: [10, 25], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 3", start: [12, 20], end: [13, 40] },
      { name: "Period 4", start: [13, 50], end: [15, 5] },
      { name: "Period 8", start: [15, 45], end: [17, 0] },
    ],
    [
      { name: "Period 5", start: [9, 40], end: [10, 55] },
      { name: "SELF", start: [11, 5], end: [11, 40] },
      { name: "Lunch", start: [11, 40], end: [12, 10] },
      { name: "Period 6", start: [12, 20], end: [13, 40] },
      { name: "Period 7", start: [13, 50], end: [15, 5] },
    ],
    null,
  ],
};
