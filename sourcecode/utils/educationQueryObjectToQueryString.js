export default function queryObjectToQueryString (query) {
  let q = '?';
  query.map((val, key) => {
    q += `${key}=${val.get('slug')}&`;
  });
  //for (const key of Object.keys(query)) {
  //  q += `${key}=${query[key]}&`;
  //}
  q = q.slice(0, -1);
  return q;
};
