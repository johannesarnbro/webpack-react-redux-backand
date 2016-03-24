const head = document.head;
const documentFragment = document.createDocumentFragment();

function findOrCreateMeta(attrVal, content, attribute, tag = 'meta') {
  let el = head.querySelector(tag + '[' + attribute + '="' + attrVal + '"]' );

  if (content) {
    if ( !el ) {
      el = document.createElement(tag);
      el.setAttribute(attribute, attrVal);
      el.setAttribute('content', content);
      documentFragment.appendChild(el);
    } else {
      el.setAttribute('content', content);
    }
  }
}

function populateValues(values) {
  const tagTitle = head.querySelector('title');
  //Meta
  if (values.title) {
    tagTitle.innerHTML = values.title;
  }
  findOrCreateMeta('description', values.desc, 'name');
  findOrCreateMeta('canonical', values.url, 'rel', 'link');
  //OpenGraph
  findOrCreateMeta('og:title', values.title, 'property');
  findOrCreateMeta('og:description', values.desc, 'property');
  findOrCreateMeta('og:site_name', values.site, 'property');
  findOrCreateMeta('og:locale', 'sv_SE', 'property');
  findOrCreateMeta('og:image', values.image, 'property');
  if ( values.type === 'page' ) {
    findOrCreateMeta('og:type', 'website', 'property');
  } else {
    findOrCreateMeta('og:type', 'article', 'property');
  }

  //Twitter
  findOrCreateMeta('twitter:title', values.title, 'name');
  findOrCreateMeta('twitter:card', values.desc, 'name');
  findOrCreateMeta('twitter:image', values.image, 'name');

  //Google+
  findOrCreateMeta('name', values.title, 'itemprop');
  findOrCreateMeta('description', values.desc, 'itemprop');
  findOrCreateMeta('image', values.image, 'itemprop');

}

export const updateMeta = (page) => {
  const values = {
    title: page.getIn(['seo', 'title']),
    url: page.getIn(['seo', 'canonical_url']),
    desc: page.getIn(['seo', 'description']),
    type: page.getIn(['seo', 'type']),
    image: page.getIn(['seo', 'image']),
    site: page.getIn(['seo', 'site']),
  };

  populateValues(values);
  head.appendChild(documentFragment);
};
