import { CountryStrategy } from '../types';
import { MAJOR_COUNTRY_STRATEGIES } from './majorCountryStrategies';
import { MINOR_COUNTRY_STRATEGIES } from './minorCountryStrategies';
import { NORDIC_AND_BALKAN_STRATEGIES } from './nordicAndBalkanStrategies';

// Aggregated master array of all 30 playable countries with full rich tactical context
export const COUNTRIES_STRATEGY_DATA: CountryStrategy[] = [
  ...MAJOR_COUNTRY_STRATEGIES,
  ...MINOR_COUNTRY_STRATEGIES,
  ...NORDIC_AND_BALKAN_STRATEGIES
];

export const getCountryStrategyById = (id: string): CountryStrategy => {
  return COUNTRIES_STRATEGY_DATA.find(c => c.id.toLowerCase() === id.toLowerCase()) || COUNTRIES_STRATEGY_DATA[0];
};

export const getCountryStrategyByTag = (tag: string): CountryStrategy => {
  return COUNTRIES_STRATEGY_DATA.find(c => c.tag.toUpperCase() === tag.toUpperCase()) || COUNTRIES_STRATEGY_DATA[0];
};
