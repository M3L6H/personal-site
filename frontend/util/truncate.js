export default (str, len=128) => {
  if (str.length <= len) return str;

  return str.slice(0, len - 3) + "...";
}
