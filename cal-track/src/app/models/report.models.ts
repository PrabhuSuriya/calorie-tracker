export interface DayCount {
  date: Date;
  count: number;
}

export interface UserAggregate {
  avg: number;
  sum: number;
  count: number;
  userId: string;
  userName: string;
}
