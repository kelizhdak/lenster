import { lensterMembers } from './lenster-members';

export const featureFlags = [
  {
    key: 'trending-widget',
    name: 'Trending widget',
    enabledFor: [...lensterMembers]
  },
  {
    key: 'i18n',
    name: 'Internationalization',
    enabledFor: [...lensterMembers]
  }
];
