// Replace it with MapSchema from Colyseus.js?
export const mapToArray = (map: Map<string, any>, fun: any) => {
  const ret: any[] = [];
  map.forEach((value, key) => {
    ret.push(fun(key, value));
  });
  return ret;
};
