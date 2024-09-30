import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ListCountryComponent from '@/components/ListCountryComponent.vue';

const mockData = [
  {
    date: '2020-04-16',
    confirmed: 100000,
    deaths: 2000,
    recovered: 95000,
    active: 3000,
    fatality_rate: 5.555,
    region: { name: 'Brasil', iso: 'BRA', province: '' }
  },
  {
    date: '2020-04-16',
    confirmed: 100000,
    deaths: 2000,
    recovered: 95000,
    active: 3000,
    fatality_rate: 6.666,
    region: { name: 'China', iso: 'CHN', province: '' }
  }
];

describe('Testa Listagem ListCountryComponent.vue', () => {
  it('Deve exibir a lista de países.', () => {
    const wrapper = mount(ListCountryComponent, {
      props: { covidData: mockData, sortOrder: 'alphabetical' }
    });
    const countryNames = wrapper.findAll('h3');
    expect(countryNames[0].text()).toBe('Brasil');
    expect(countryNames[1].text()).toBe('China');
  });

  it('Deve ordenar a lista em ordem alfabetica', () => {
    const wrapper = mount(ListCountryComponent, {
      props: { covidData: mockData, sortOrder: 'alphabetical' }
    });

    const countryNames = wrapper.findAll('h3');
    expect(countryNames[0].text()).toBe('Brasil');
    expect(countryNames[1].text()).toBe('China');
  });
});
