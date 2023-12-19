const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isBalanced(str) {
  const stack = [];

  const bracketMapping = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  for (let char of str) {
    if (!"{[()]}".includes(char)) {
      console.log("Chuỗi ký tự không hợp lệ");
      return false;
    }

    if (char === "{" || char === "[" || char === "(") {
      stack.push(char);
    } else {
      const topElement = stack.pop();

      if (bracketMapping[topElement] !== char || !topElement) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

rl.question("Nhập số lượng test: ", (numberOfTests) => {
  const N = parseInt(numberOfTests);

  if (!isNaN(N) && N > 0 && N <= 100) {
    let currentTest = 1;

    function getInputForTest() {
      rl.question(
        `Nhập chuỗi cần kiểm tra (Test ${currentTest}): `,
        (userInput) => {
          if (userInput.length > 100000) {
            console.log("Độ dài xâu nhỏ hơn 100000 ký tự");
            getInputForTest();
            return;
          }

          if (isBalanced(userInput)) {
            console.log(`Chuỗi cân bằng (Test ${currentTest}).`);
          } else {
            console.log(`Chuỗi không cân bằng (Test ${currentTest}).`);
          }

          if (currentTest < N) {
            currentTest++;
            getInputForTest();
          } else {
            rl.close();
          }
        }
      );
    }

    getInputForTest();
  } else {
    console.log(
      "Vui lòng nhập một số nguyên lớn hơn 0 và nhỏ hơn hoặc bằng 100"
    );
    rl.close();
  }
});
