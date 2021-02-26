export const getUniqueIds = (ids: string[]): string[] =>
  Array.from(new Set<string>(ids));

export const getIdFromLink = (link: string): string =>
  !!link ? link.slice(link.lastIndexOf('/') + 1) : '';
