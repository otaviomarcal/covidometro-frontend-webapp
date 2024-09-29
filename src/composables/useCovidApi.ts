import { ref } from 'vue';
import { countrySearchTranslate, invertTranslationList } from '@/utils/CountryUtils';
import type { CovidReport } from '@/types/CovidReport';


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
          const response = await fetch(`https://covid-api.com/api/reports?iso=${iso}`);
          return await response.json();
        })
      );

      covidData.value = responses.map((response) => {
        const report = response.data[0];
        const translatedName = countrySearchTranslate[report.region.name] || report.region.name;
        return {
          ...report,
          region: {
            ...report.region,
            name: translatedName,
          },
        };
      });
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchDataByCountry = async (countryName: string) => {
    error.value = null;
    loading.value = true;

    const countryNameLowerCase = countryName.toLowerCase();
    const translatedCountryName = invertTranslationList[countryNameLowerCase] || countryName;

    try {
      const response = await fetch(`https://covid-api.com/api/reports?region_name=${translatedCountryName}`);
      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        const report = data.data[0];
        const translatedName = countrySearchTranslate[report.region.name] || report.region.name;
        covidData.value = [
          {
            ...report,
            region: {
              ...report.region,
              name: translatedName,
            },
          },
        ];
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
