const isLinkToCurrentSite = link => {
  return link.indexOf(window.location.host) > -1;
};

export default isLinkToCurrentSite;
