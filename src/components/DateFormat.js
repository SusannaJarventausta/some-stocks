export default function DateFormat(propDate) {
  let date = new Date(propDate);
  let dateString =
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + date.getDate()).slice(-2) +
    '/' +
    date.getFullYear();
  return dateString;
}
