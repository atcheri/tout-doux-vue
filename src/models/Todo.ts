export type Todo = {
  id: number;
  content: string;
  category: "business" | "personal";
  done: boolean;
  createdAt: number;
};
