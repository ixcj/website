/// <reference types="vite/client" />
declare module '*.vue' {
  import type { defineComponent } from 'vue'

  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module 'github-calendar' {
  interface GitHubCalendarOptions {
    global_stats?: boolean
    cache?: string | number
    tooltips?: boolean
    proxy?: (username: string) => Promise<string>
  }

  export default function GitHubCalendar(
    element: string | Element,
    username: string,
    options?: GitHubCalendarOptions,
  ): Promise<void>
}
