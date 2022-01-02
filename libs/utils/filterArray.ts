export function filterArray(arr: unknown[], field: string, filter = ""): any[] {
  const regexp = new RegExp(filter, "i");
  return arr.filter((el: any) => {
    return el[field].match(regexp) ? true : false;
  });
}
