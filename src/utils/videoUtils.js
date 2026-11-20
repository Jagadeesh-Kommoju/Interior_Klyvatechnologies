/**
 * Video Helper Utilities
 * Supports:
 * - Instagram Reels & Posts (embed player + direct links)
 * - Direct MP4 / WebM / Cloudinary URLs
 * - YouTube standard links, youtu.be links, and YouTube Shorts
 * - Vimeo links
 * - Safe placeholder detection
 */

export function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function extractVimeoId(url) {
  if (!url || typeof url !== 'string') return null;
  const regExp = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|))(\d+)(?:$|\/|\?)/;
  const match = url.match(regExp);
  return match ? match[3] : null;
}

export function extractInstagramId(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/(?:instagram\.com\/(?:reel|p)\/|instagr\.am\/(?:reel|p)\/)([A-Za-z0-9_-]+)/i);
  return match ? match[1] : null;
}

export function parseVideoSource(videoUrl, thumbnail) {
  if (!videoUrl || videoUrl === 'ADD_VIDEO_URL_HERE') {
    return {
      type: 'placeholder',
      isPlaceholder: true,
      thumbnail: thumbnail && thumbnail !== 'ADD_THUMBNAIL_URL_HERE' ? thumbnail : null
    };
  }

  // Check Instagram
  const instaId = extractInstagramId(videoUrl);
  if (instaId) {
    const poster = thumbnail && thumbnail !== 'ADD_THUMBNAIL_URL_HERE' ? thumbnail : null;
    return {
      type: 'instagram',
      reelId: instaId,
      embedUrl: `https://www.instagram.com/reel/${instaId}/embed/`,
      reelUrl: `https://www.instagram.com/reel/${instaId}/`,
      poster
    };
  }

  // Check YouTube
  const ytId = extractYouTubeId(videoUrl);
  if (ytId) {
    const poster = thumbnail && thumbnail !== 'ADD_THUMBNAIL_URL_HERE'
      ? thumbnail
      : `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    return {
      type: 'youtube',
      videoId: ytId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${ytId}`,
      poster
    };
  }

  // Check Vimeo
  const vimeoId = extractVimeoId(videoUrl);
  if (vimeoId) {
    return {
      type: 'vimeo',
      videoId: vimeoId,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&playsinline=1&loop=1`,
      poster: thumbnail && thumbnail !== 'ADD_THUMBNAIL_URL_HERE' ? thumbnail : null
    };
  }

  // Direct MP4 / Cloudinary / WebM
  return {
    type: 'mp4',
    src: videoUrl,
    poster: thumbnail && thumbnail !== 'ADD_THUMBNAIL_URL_HERE' ? thumbnail : null
  };
}
