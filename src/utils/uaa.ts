const urlJoinParams = (url: string, data: Record<string, string>): string => {
  for (const key in data) {
    if (data[key]) {
      if (url.indexOf('?') < 0) {
        url += '?' + key + '=' + data[key]
      } else {
        url += '&' + key + '=' + data[key]
      }
    }
  }
  return url
}
