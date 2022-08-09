import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs().format();

export const createCustomDate = (d: Date | null, hour: number, min: number, seconds: number) => {
  const currentDate = dayjs()
    .utcOffset(0)
    .year(parseInt(d?.getFullYear().toString() || ''))
    .month(parseInt(d?.getMonth().toString() || ''))
    .date(parseInt(d?.getDate().toString() || ''))
    .hour(hour)
    .minute(min)
    .second(seconds)
    .millisecond(999)
    .toString();
  // .valueOf();
  // console.log('---------currentDate', currentDate);

  const res = new Date(currentDate).toISOString();
  return res;
};
