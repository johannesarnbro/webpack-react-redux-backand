function filterArticlesThroughQuery(articles, query) {
  let filteredArticles = articles;

  if (query.get('type')) {
    filteredArticles = filteredArticles.filter(article => {
      return article.get('type') === query.get('type');
    });
  }
  if (query.get('size')) {
    filteredArticles = filteredArticles.take(query.get('size'));
  }

  return filteredArticles;
}

export default filterArticlesThroughQuery;
