const operators = ['+', '-'];

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

const createProblem = ({ answersCount }) => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operatorIndex = Math.floor(Math.random() * operators.length);

  const problem = `${num1} ${operators[operatorIndex]} ${num2}`;

  const correctAnswer = parseInt(eval(problem));

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
