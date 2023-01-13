export interface QuestionaireInformation {
  answersQuestion?: {
    answers: any[];
    content: string;
    id: number;
    multipleChoice: true;
  }[];
  submit?: boolean;
}
