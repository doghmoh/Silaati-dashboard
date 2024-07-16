import { timeParse, timeFormat, group, sum } from 'd3';

const parseDate = timeParse('%Y-%m-%d');
const formatDay = timeFormat('%d %b');
const formatMonth = timeFormat('%b');
const formatYear = timeFormat('%Y');

export const aggregateData = (data, period) => {
  const dateAccessor = d => parseDate(d.date);

  let format;
  if (period === 'day') format = formatDay;
  else if (period === 'month') format = formatMonth;
  else if (period === 'year') format = formatYear;

  const aggregated = Array.from(
    group(data, d => format(dateAccessor(d))),
    ([key, values]) => ({
      date: key,
      totalAmount: sum(values, v => v.totalAmount)
    })
  );

  return aggregated;
};
