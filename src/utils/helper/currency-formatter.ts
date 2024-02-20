export function currencyFormatter(num: number | string): string {
  if (typeof num === "string") num = parseInt(num);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $";
}
