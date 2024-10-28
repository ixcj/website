type TimelineTurntableItemChildren = {
  title: string
  describe: string
  range: [number, number]
}

export interface TimelineTurntableItem {
  date: [string, string]
  angleRange: [number, number]
  children: TimelineTurntableItemChildren[]
}