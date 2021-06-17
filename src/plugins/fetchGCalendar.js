const apiKey = "AIzaSyAkU4KknsUMUfizd8J_DLL76V7eD0nSl1E";

const EARLIEST_AM_HOUR = 6;

const HTMLnewlineRegex = /<\/?(p|div|br).*?>|\),? *(?=[A-Z0-9])/g;
const noHTMLRegex = /<.*?>/g;
const noNbspRegex = /&nbsp;/g;
const timeGetterRegex = /\(?(1?[0-9])(?::([0-9]{2}))? *(?:am)? *(?:-|–) *(1?[0-9])(?::([0-9]{2}))? *(noon|pm)?\)?/;
const newLineRegex = /\r?\n/g;
const noNewLineBeforeTimeRegex = /\n\(/g; // hack for 2019-09-06 schedule
export const altScheduleRegex = /schedule|extended|lunch/i;
// "Labor Day - No School" 2020-09-07
export const noSchoolRegex = /holiday|no\s(students|school)|break|development/i;

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export async function eventsForDay(dob) {
  const startTime = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
  const endTime = startTime.addDays(1);
  endTime.setMilliseconds(-1);
  const { items: events } = await (
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        "fg978mo762lqm6get2ubiab0mk0f6m2c@import.calendar.google.com"
      )}/events?key=${apiKey}&timeMin=${startTime.toISOString()}&timeMax=${endTime.toISOString()}&timeZone=America/Los_Angeles&showDeleted=false&singleEvents=true&orderBy=startTime&fields=items(description%2Cend(date%2CdateTime)%2Clocation%2Cstart(date%2CdateTime)%2Csummary)`
    )
  ).json();
  return events;
}

function parseAlternate(summary, description) {
  if (altScheduleRegex.test(summary)) {
    if (!description) return undefined;
    description =
      "\n" +
      description
        .replace(noNewLineBeforeTimeRegex, "(")
        .replace(HTMLnewlineRegex, "\n")
        .replace(noHTMLRegex, "")
        .replace(noNbspRegex, " ");
    const periods = [];
    description.split(newLineRegex).map((str) => {
      let times;
      const name = str
        .replace(timeGetterRegex, (...matches) => {
          times = matches;
          return "";
        })
        .trim();

      if (!times) {
        if (periods.length > 0) {
          periods[periods.length - 1].name += "\n" + name;
        }
        return;
      }

      let [, sH, sM = 0, eH, eM = 0, pm] = times;

      sH = +sH;
      sM = +sM;
      eH = +eH;
      eM = +eM;
      if (sH < EARLIEST_AM_HOUR || pm === "pm") sH += 12;
      if (eH < EARLIEST_AM_HOUR || pm === "pm") eH += 12;
      const startTime = sH * 60 + sM;
      const endTime = eH * 60 + eM;

      const duplicatePeriod = periods.findIndex((p) => p.start === startTime);
      if (~duplicatePeriod) {
        periods[duplicatePeriod].name += "\n" + name;
        if (endTime > periods[duplicatePeriod].end)
          periods[duplicatePeriod].end = endTime;
      } else {
        // customise your format here
        periods.push({
          name: name,
          start: startTime,
          end: endTime,
        });
      }
    });
    return periods.length > 0 ? periods : undefined;
  } else if (noSchoolRegex.test(summary)) {
    if (description) return undefined;
    return null;
  }
}

export function toAlternateSchedules(eventItems) {
  const altSchedules = {};
  for (let i = eventItems.length; i--; ) {
    const schedule = parseAlternate(
      eventItems[i].summary,
      eventItems[i].description
    );
    if (schedule === undefined) continue;
    if (eventItems[i].start.date) {
      const dateObj = new Date(eventItems[i].start.date);
      while (
        dateObj.toISOString().slice(5, 10) !==
        eventItems[i].end.date.slice(5, 10)
      ) {
        altSchedules[dateObj.toISOString().slice(5, 10)] = schedule;
        dateObj.setUTCDate(dateObj.getUTCDate() + 1);
      }
    } else {
      altSchedules[eventItems[i].start.dateTime.slice(5, 10)] = schedule;
    }
  }
  return altSchedules;
}

export function detectAltSchedFromEvents(events, dateDate) {
  const date = dateDate.toISOString().slice(5, 10);
  const alternateJSON = events.filter(
    (ev) => altScheduleRegex.test(ev.summary) || noSchoolRegex.test(ev.summary)
  );
  const altSched = toAlternateSchedules(alternateJSON);
  if (altSched[date] === undefined) return { isAlt: false, schedule: null };

  return altSched;
}

export function dayOverview(dob) {}
