interface Answer {
  question: string;
  student: string;
  class: string;
  tags: string[];
  answered: boolean;
  submitAt: any;
  answeredBy?: string;
  answeredAt?: string;
  answer?: string;
}

export default Answer;
