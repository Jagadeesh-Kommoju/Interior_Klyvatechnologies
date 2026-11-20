import { useEffect } from 'react';

export default function SEO({ title, description, canonicalUrl }) {
  useEffect(() => {
    // Update Page Title
    if (title) {
      document.title = title;
    }

    // Update Meta Description
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      let twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', description);
    }

    // Update Canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, canonicalUrl]);

  return null;
}
