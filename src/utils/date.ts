export const str2date = (value: string | null | undefined) => {
  return value ? new Date(value) : undefined
}

export const isPast = (value?: Date) => {
  const now = new Date()
  return value ? value.getTime() < now.getTime() : false
}

export const isFuture = (value?: Date) => {
  const now = new Date()
  return value ? value.getTime() > now.getTime() : false
}
