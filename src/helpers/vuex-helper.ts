export function updateObjectInArray(array: any[], action: { index: number, item: any }): any[] {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item;
    }
    return {
      ...item,
      ...action.item,
    };
  })
}
