import type {
  dateData,
  TimelineTurntableItem,
  TimelineTurntableItemChildren,
} from '@/types/TimelineTurntable'

export interface TimelineTurntableTransformItem {
  date: [string, string]
  title?: string | undefined
  angleRange: [number, number]
  children: TimelineTurntableItemChildren[]
}

interface dateDataTransform {
  year: number
  month: number
}

export function transformTimelineTurntableItem(data: TimelineTurntableItem[]): TimelineTurntableTransformItem[] {
  let angleSum = 0
  const monthSpanSum = getMonthSpanSum(data)
  const result: TimelineTurntableTransformItem[] = data.map((item) => {
    const [_start, _end] = item.date
    const start = distinguishDateData(_start)
    const end = distinguishDateData(_end)

    const monthSpan = getAngleRatio([start, end], monthSpanSum)
    const angleRange: [number, number] = [angleSum, angleSum + monthSpan]
    angleSum += monthSpan

    return {
      date: [getDateString(start), getDateString(end)],
      angleRange,
      title: item.title,
      children: item?.children || [0, 1],
    }
  })
  return result
}

export function getDateString(date: dateDataTransform): string {
  const { year, month } = date
  return `${year}-${month < 10 ? `0${month}` : month}`
}

export function getMonthSpanSum(items: TimelineTurntableItem[]): number {
  let spanSum = 0

  items.forEach((item) => {
    const [startDate, endDate] = item.date
    const span = getMonthSpan(startDate, endDate)
    spanSum += span
  })

  return spanSum
}

export function getMonthSpan(startDate: dateData, endDate: dateData): number {
  const _startDate = distinguishDateData(startDate)
  const _endDate = distinguishDateData(endDate)

  const startYear = _startDate.year
  const startMonth = _startDate.month

  const endYear = _endDate.year
  const endMonth = _endDate.month

  const yearDiff = endYear - startYear
  const monthDiff = endMonth - startMonth

  return yearDiff * 12 + monthDiff
}

export function getAngleRatio(
  dateRange: [dateDataTransform, dateDataTransform],
  monthSpanSum: number,
  decimals: number = 4,
): number {
  const [start, end] = dateRange

  const monthSpan = getMonthSpan(start, end)
  const angleRatio = monthSpan / monthSpanSum * 360

  return Number(angleRatio.toFixed(decimals))
}

export function sortExperiences(
  timelineTurntableItem: TimelineTurntableItem[],
  sort: 'desc' | 'asc' = 'desc',
): TimelineTurntableItem[] {
  const _timelineTurntableItem = [...timelineTurntableItem]
  const _sort = sort === 'desc' ? -1 : 1
  const result = _timelineTurntableItem.sort((a, b) => {
    const [startA] = a.date
    const [startB] = b.date

    const _startA = distinguishDateData(startA)
    const _startB = distinguishDateData(startB)

    const startTimeA = new Date(distinguishDateData(_startA).year, (_startA).month).getTime()
    const startTimeB = new Date((_startB).year, (_startB).month).getTime()

    return (startTimeA - startTimeB) * _sort
  })

  return result
}

export function distinguishDateData(date: dateData) {
  return date === 'now'
    ? { year: new Date().getFullYear(), month: new Date().getMonth() + 1 }
    : date
}
