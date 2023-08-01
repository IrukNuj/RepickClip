// FIXME: ヤバ名前
export function dateToFullJstLocale(date: Date) {
  return `${date.getFullYear()}/${date.getMonth().toString().padStart(2, '0')}/${date
    .getDay()
    .toString()
    .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}
