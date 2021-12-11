async function addNewQuestion({ question, student, studentClass, tags }) {
  return question + student + tags + studentClass;
}

export { addNewQuestion };
