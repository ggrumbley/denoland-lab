export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export const TASK_FILTERS = {
  ALL: "ALL",
  TODO: "TODO",
  DONE: "DONE",
} as const;

export type TaskFilter = (typeof TASK_FILTERS)[keyof typeof TASK_FILTERS];
