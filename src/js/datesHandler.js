import { DateTime } from "luxon";

export const diffDates = (firstDate, secondDate) => {
  firstDate = DateTime.fromISO(firstDate);
  secondDate = DateTime.fromISO(secondDate);

  if (firstDate > secondDate)
    secondDate = [firstDate, (firstDate = secondDate)][0];
  return secondDate
    .diff(firstDate, ["years", "months", "days", "hours", "minutes", "seconds"])
    .toObject();
};

export const diffToHtml = (diff) => `
<span class="result-date">
  ${diff.years ? `Years: <span class="value">${diff.years}</span> ` : ""}
  ${diff.months ? `Months: <span class="value">${diff.months}</span> ` : ""}
  ${diff.days ? `Days: <span class="value">${diff.days}</span>` : ""}
  ${diff.hours ? `Hours: <span class="value">${diff.hours}</span>` : ""}
  ${diff.minutes ? `Minutes: <span class="value">${diff.minutes}</span>` : ""}
  ${diff.seconds ? `Seconds: <span class="value">${diff.seconds}</span>` : ""}
</span>
`;
