export function validateUrl(url: string) {
  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})" + // domain name
      "(:\\d{1,5})?" + // port
      "(/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i",
  );
  return urlRegex.test(url);
}

export function validateFilepath(filepath: string) {
  const pathRegex = new RegExp("^(.+)\\.json$", "i");
  return pathRegex.test(filepath);
}
