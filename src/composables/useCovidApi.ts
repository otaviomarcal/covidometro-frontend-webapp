import { ref } from 'vue';

interface CovidReport {
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

const countrySearchTraslate: Record<string, string> = {
  "África do Sul": "South Africa",
  "Austrália": "Australia",
  "Brasil": "Brazil",
  "Estados Unidos": "United States",
  "China": "China",
};

export function useCovidApi() {
  const covidData = ref<CovidReport[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);


  const fetchDataList = async (isoCountriesList: string[]) => {
    error.value = null;
    loading.value = true;
    try {
      const responses = await Promise.all(
        isoCountriesList.map(async iso => {
          console.log(iso)
          const response = await fetch(`https://covid-api.com/api/reports?iso=${iso}`);
          return await response.json();
        })
      );

      covidData.value = responses.map(response => response.data[0]);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchDataByCountry = async (countryName: string) => {
    error.value = null;
    loading.value = true;
    try {
      const response = await fetch(`https://covid-api.com/api/reports?region_name=${countryName}`);
      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        covidData.value = [data.data[0]];
      } else {
        error.value = 'País não encontrado ou sem dados';
      }
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { fetchDataList, fetchDataByCountry, covidData, loading, error };
}
