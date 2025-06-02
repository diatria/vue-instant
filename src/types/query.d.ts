export interface Query {
  queries?: Array<{ field: string; value: string | number; strict?: boolean }>;
  relations?: Array<string>;
}
