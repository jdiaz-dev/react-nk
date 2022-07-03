import dayjs from 'dayjs'
dayjs().format()


export const createCustomDate = (d: Date|null, hour: number) => {
  const currentDate = dayjs()
  .year(parseInt(d?.getFullYear().toString()|| ''))
  .month(parseInt(d?.getMonth().toString() || ''))
  .day(parseInt(d?.getDay().toString() || ''))
  .hour(hour)
  .minute(59)
  .second(59)
  .millisecond(999)
  .valueOf()

  return new Date(currentDate).toISOString();
};
