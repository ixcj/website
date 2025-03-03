export type dateData = {
  year: number
  month: number
} | 'now'

export type TimelineTurntableItemChildren = {
  title?: string
  describe: string
  range?: [number, number]
}

export interface TimelineTurntableItem {
  date: [dateData, dateData]
  title?: string
  children: TimelineTurntableItemChildren[]
}
