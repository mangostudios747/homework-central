const apiKey = "AIzaSyAkU4KknsUMUfizd8J_DLL76V7eD0nSl1E";

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

export async function detectAltSchedFromEvents(events) {
  const alternateJSON = events.filter(
    (ev) => altScheduleRegex.test(ev.summary) || noSchoolRegex.test(ev.summary)
  );
}

export async function dayOverview(dob) {}
