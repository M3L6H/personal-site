export default (str, len=128) => {
  if (str.length <= len) return str;

  let truncated = str.slice(0, len - 3);

  while (truncated.match(/[^\w]$/)) {
    truncated = truncated.slice(0, truncated.length - 1);
  }

  return truncated + "...";
}
