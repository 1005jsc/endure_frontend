export type GoalType = {
  id: number;
  goalName: string | null | undefined;
  createdDate: string;
  endureNum: number;
  doneDate: string | null | undefined;
};

export type ResponseType<T> = {
  data: T;
  message: string | undefined;
};
