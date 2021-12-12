/* eslint-disable newline-per-chained-call */
import joi from 'joi';

export function validateNewQuestion(object: object): boolean {
  const questionSchema = joi.object({
    question: joi.string().trim().min(5).max(255).required(),
    student: joi.string().required(),
    studentClass: joi.number().required(),
    tags: joi.array().required(),
  });

  const { error } = questionSchema.validate(object);
  return !joi.isError(error);
}
