export const generatePaginationNavArray = (
  currentPage: number,
  numberOfPage: number,
  deltaValue: number
) => {
  let delta = deltaValue
  let range = []
  let rangeWithDots = []
  let l;

  range.push(1);

  if (numberOfPage <= 1) {
    return range;
  }

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < numberOfPage && i > 1) {
      range.push(i);
    }
  }
  range.push(numberOfPage);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l+1);
      } else if (i - l !== 1) {
        rangeWithDots.push(null);
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export const camelToSentenceCase = (text: string) => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); })
}