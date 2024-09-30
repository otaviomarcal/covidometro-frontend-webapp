export interface CovidReport {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  fatality_rate: number;
  region: {
    iso: string;
    name: string;
    province: string;
  };
}
