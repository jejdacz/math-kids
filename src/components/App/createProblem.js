const createSustraction = limit => {
  const num1 = Math.floor(Math.random() * limit);
  const num2 = Math.floor(Math.random() * limit);
  const problem = `${num1} + ${num2}`;
  const answer = num1 + num2;
  return {
    problem,
    answer
  };
};

const createAddition = limit => {
  const num1 = Math.floor(Math.random() * limit);
  const num2 = Math.floor(Math.random() * limit);
  const problem = `${num1 + num2} - ${num1}`;
  const answer = num2;
  return {
    problem,
    answer
  };
};

const operations = [createAddition, createSustraction];

const createBadAnswer = answer => {
  const num = Math.floor(Math.random() * 10);
  return num;
};

const addUnique = (fn, arr) => {
  const item = fn();
  return arr.includes(item) ? addUnique(fn, arr) : [...arr, item];
};

// array sort function to shuffle values
const shuffle = (a, b) => 0.5 - Math.random();

const createProblem = ({ answersCount, limit }) => {
  const operatorIndex = Math.floor(Math.random() * operations.length);

  const { problem, answer: correctAnswer } = operations[operatorIndex](limit);

  // create array of given length with random numbers
  let answers = [correctAnswer];

  while (answers.length < answersCount) {
    answers = addUnique(() => createBadAnswer(correctAnswer), answers);
  }

  answers = answers.sort(shuffle);

  return {
    problem,
    correctAnswer,
    answers
  };
};

export default createProblem;
