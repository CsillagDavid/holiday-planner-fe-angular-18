export interface HasSortOrder {
  sortOrder: number;
}

export function swapSortOrder<T extends HasSortOrder>(array: T[], indexA: number, indexB: number): void {
  if (indexA === indexB) return;

  const itemA = array[indexA];
  const itemB = array[indexB];

  if (!itemA || !itemB) {
    throw new Error('Index out of bounds');
  }

  const temp = itemA.sortOrder;
  itemA.sortOrder = itemB.sortOrder;
  itemB.sortOrder = temp;
}
