export interface Query {
  queries?: Array<{
    field: string
    value: string | number | boolean | undefined
    strict?: boolean
    op?: string | undefined
  }>
  relations?: Array<string>
}
