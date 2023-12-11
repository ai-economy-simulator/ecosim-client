// Replace it with MapSchema from Colyseus.js?
export const mapToArray = (map: Map<string, any>, fun: any) => {
  const ret: any[] = [];
  let idx = 0;
  map.forEach((value, key) => {
    ret.push(fun(key, value, idx));
    idx += 1;
  });
  return ret;
};
