export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-DO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatNumber(num: string | number, locale = 'DOP') {
  return new Intl.NumberFormat('es-DO', {
    style: 'decimal',
    currency: locale,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(num))
}
