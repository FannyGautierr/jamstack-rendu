export const primaryColor = '#096DD9'
export const secondaryColor = '#16A34A'
export const tertiaryColor = '#FACC15'
export const orangeColor = '#F97316'
export const redColor = '#EF4444'
export const grayColor = '#9A9A98'
export const purpleColor = '#7C3AED'
export const darkBlueColor = '#164E63'

export const colors = [primaryColor, secondaryColor, tertiaryColor, orangeColor, redColor, grayColor, purpleColor, darkBlueColor]

export const tagColors = [
  { backgroundColor: '#F5F3FF', color: '#6D28D9' }, // Purple
  { backgroundColor: '#EFF6FF', color: '#1D4ED8' }, // Blue
  { backgroundColor: '#FEF2F2', color: '#B91C1C' }, // Red
  { backgroundColor: '#F0FDF4', color: '#15803D' }, // Green
  { backgroundColor: '#FEFCE8', color: '#A16207' }, // Yellow
]

export function getColorFromString(str) {
  if (!str || typeof str !== 'string')
    return colors[0]

  let sum = 0
  for (let i = 0; i < str.length; i++)
    sum += str.charCodeAt(i)

  return colors[sum % colors.length]
}

export function generateTagStyleFromString(str) {
  let sum = 0
  for (let i = 0; i < str.length; i++)
    sum += str.charCodeAt(i)

  const tagColor = tagColors[sum % tagColors.length]
  return `bg-[${tagColor.backgroundColor}] text-[${tagColor.color}]`
}