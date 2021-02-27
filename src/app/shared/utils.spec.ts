import { getIdFromLink, getUniqueIds } from './utils';

describe('Utils', () => {
  it('should filter unique ids', () => {
    expect(getUniqueIds(['2', '2', '2', '3'])).toEqual(['2', '3']);
  });
  it('should get id from link handling null values', () => {
    expect(getIdFromLink('https://www.dummy.it/43')).toEqual('43');
    expect(getIdFromLink(undefined)).toBe('');
  });
});
