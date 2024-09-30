import { describe, expect, it } from 'vitest';
import { getCountryInEnglish } from '@/utils/CountryUtils';

describe('Tratamento dos nomes em Inglês para Português', () => {
  it('Deve traduzir o nome do País para Ingles', () => {
    expect(getCountryInEnglish('Brasil')).toBe('Brazil');
    expect(getCountryInEnglish('Estados Unidos')).toBe('US');
  });

  it('Deve retornar input se o país não estiver na lista de tradução', () => {
    expect(getCountryInEnglish('País Desconhecido')).toBe('País Desconhecido');
  });

  it('Deve aceitar nome sem acentos', () => {
    expect(getCountryInEnglish('Nova Zelandia')).toBe('New Zealand');
  });
});
