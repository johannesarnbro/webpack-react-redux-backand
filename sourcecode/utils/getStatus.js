export default function isReady (obj, target) {
  const status = obj.status;
  const items = obj.items;
  //console.log('getStatus.js isReady obj, target -->', obj, target);
  if (status === 'fetching' && !items.size) {
    return 'fetching-initial';
  } else if (status === 'fetching' && items.size) {
    return 'fetching-more';
  } else if (status === 'done' && obj.didInvalidate) {
    return 'fail';
  } else if (status === 'done' && !obj.didInvalidate) {
    return 'success';
  }

  //if (status === 'done' && !items.size) {
  //  return 'empty';
  //} else if (status === 'done' && items.size) {
  //  status = <LandingPageHero content={page.pageHero}/>;
  //}
};
