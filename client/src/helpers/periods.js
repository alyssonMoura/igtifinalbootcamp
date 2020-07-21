const CURRENT = new Date().getFullYear();
const YEARS = [CURRENT - 1, CURRENT, CURRENT + 1];
const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const PERIODS = [];

YEARS.forEach((year) => {
  MONTHS.forEach((month) => {
    let period = `${year}-${month}`;
    PERIODS.push(period);
  });
});
export { PERIODS };
