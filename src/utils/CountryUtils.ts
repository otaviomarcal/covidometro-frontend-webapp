export const countrySearchTranslate: Record<string, string> = {
  "South Africa": "África do Sul",
  "North Africa": "África do Norte",
  "Australia": "Austrália",
  "Brazil": "Brasil",
  "US": "Estados Unidos",
  "China": "China",
  "India": "Índia",
  "Japan": "Japão",
  "New Zealand": "Nova Zelândia",
  "Germany": "Alemanha",
  "Italy": "Itália",
  "France": "França",
  "Spain": "Espanha",
  "United Kingdom": "Reino Unido",
  "Canada": "Canadá",
  "Greenland": "Groenlândia",
  "Russia": "Rússia",
  "South Korea": "Coreia do Sul",
  "North Korea": "Coreia do Norte",
  "Saudi Arabia": "Arábia Saudita",
  "United Arab Emirates": "Emirados Árabes Unidos"
};

export const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export const invertTranslationList: Record<string, string> = Object.fromEntries(
  Object.entries(countrySearchTranslate).map(([english, portuguese]) => [portuguese.toLowerCase(), english])
);

export const getCountryInEnglish = (input: string): string => {
  const normalizedInput = normalizeText(input);
  const country = Object.keys(invertTranslationList).find(
    country => normalizeText(country) === normalizedInput
  );
  return country ? invertTranslationList[country] : input;
};
