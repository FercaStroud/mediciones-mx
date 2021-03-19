declare interface Survey {
  id: number;
  survey_id: number;
  title: string;
  slug: string;
  description: string;
  welcome_text: string;
  end_text: string;
  anonymized: boolean;
  active: boolean;
}
