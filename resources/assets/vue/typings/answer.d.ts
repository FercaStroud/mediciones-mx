declare interface Answer {
  id: number;
  question_id: number;
  title: string;
  value: string;
  order: number;
  end_survey: boolean;
  required: boolean;
  force_question_id: number;
  src: any;
}
