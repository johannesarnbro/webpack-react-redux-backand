function wrapVideo (content) {
  const youtubeRegexp = new RegExp([
    '(\<iframe)(.+)(?:https:\/\/)?(?:www\.)?',
    '(?:youtube\.com|youtu\.be)',
    '\/(?:watch\?v=)?(.+)(\/iframe\>)',
  ].join(''), 'g');

  return content.replace(
    youtubeRegexp,
    '<div data-video="true">$&</div>'
  );
}

export default wrapVideo;
