import dayjs from 'dayjs'
dayjs().format()

const date = new Date();
const help = date;

const day = dayjs()
.year(2022)
.month(0)
.day(29)
.minute(59)
.second(59)
.millisecond(999)
.valueOf() // => new Date().setSeconds(30)
day
help;
const resHours1 = date.setUTCHours(0, 0, 0, 0);
const resHours2 = date.setUTCHours(23, 59, 59, 999);
const res00 = date.setUTCHours(24, 0, 0, 0);
const _res1 = new Date(resHours1).toISOString();
const _res2 = new Date(day).toISOString();

_res1;
_res2;

const date2 = new Date('1995-12-20T03:24:00').getDate();
date2;
export const createCurrentDate = (d: Date | null, hour: number) => {
  const varr = `${d?.getFullYear()}-${
    d?.getMonth().toString().length === 1 ? '0' + d?.getMonth() : d?.getMonth()
  }-0${d?.getDate()}T0${hour}:59:59`;
  const varr2 = '2022-12-02T04:59:59';
  varr;
  const currDate = new Date(varr);
  currDate;
  return new Date(currDate).toISOString();
};

createCurrentDate(new Date(), 4);
