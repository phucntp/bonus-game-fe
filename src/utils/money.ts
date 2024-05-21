import numeral from 'numeral';

const singleNumberToText = (num: number) => {
  if (num > 9 || num < 1) {
    return '';
  }
  return ['một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'][
    num - 1
  ];
};

const groupNumberToText = (group: number) =>
  `${group}`
    .split('')
    .reverse()
    .map((num, index) => {
      const value = parseInt(num, 10);
      if (value < 1) {
        return undefined;
      }
      switch (index) {
        case 1:
          return value === 1 ? 'mười' : `${singleNumberToText(value)} mươi`;
        case 2:
          return `${singleNumberToText(value)} trăm`;
        default:
          return `${singleNumberToText(value)}`;
      }
    })
    .filter(Boolean)
    .reverse()
    .join(' ');

export const numberToText = (num: number) => {
  const map = ['đồng', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];
  return numeral(num)
    .format('0,0')
    .split(/[.,]/)
    .reverse()
    .map((n, index) => {
      const textOfNumber = groupNumberToText(parseInt(n, 10));
      return textOfNumber && `${textOfNumber} ${map[index]}`;
    })
    .filter(Boolean)
    .reverse()
    .join(' ');
};
