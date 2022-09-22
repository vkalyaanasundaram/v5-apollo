export default function UtmParams(url) {
    return url &&  url.includes(`?`) ? `?`+ url.split(`?`)[1] : ``
  }