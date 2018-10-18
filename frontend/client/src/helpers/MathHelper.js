export const round = (number, digits) => Number((Math.round(number * 100) / 100).toFixed(digits)).toString();
export const gained = (num1, num2) => (num1 === 0 ? 0 : (num2 - num1) / num1 * 100);
export const byUnit = num => {
  if (num > 1000000) {
    return `${round(num / 1000000, 2)}M`;
  }
  if (num > 1000) {
    return `${round(num / 1000, 2)}K`;
  }
  return round(num, 2);
};
