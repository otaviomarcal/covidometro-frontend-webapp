import { describe, it, expect } from 'vitest';
import { useCovidApi } from '@/composables/useCovidApi';

describe('Testar Retorno da API', () => {
  it('Deve buscar e retornar os dados dos países buscados', async () => {
    const { fetchDataList, covidData } = useCovidApi();

    await fetchDataList(['BRA', 'USA']);
    expect(covidData.value.length).toBeGreaterThan(0);
  });

  it('Deve tratar os erros', async () => {
    const { fetchDataByCountry, error } = useCovidApi();
    await fetchDataByCountry('InvalidCountry');
    expect(error.value).toBe('País não encontrado ou sem dados');
  });
});
