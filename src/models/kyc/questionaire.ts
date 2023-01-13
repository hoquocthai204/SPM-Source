export interface Questionaire {
  id: number;
  content: string;
  multipleChoice: boolean;
  answers: { id: number; content: string }[];
}
