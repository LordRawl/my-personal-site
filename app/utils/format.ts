export const formatCount = (value: number) =>
  `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')}+`
