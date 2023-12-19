const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function countScoreCombinations(x, y) {
  let dp = new Array(x + 1).fill(0).map(() => new Array(y + 1).fill(0));

  dp[0][0] = 1;

  for (let i = 0; i <= x; i++) {
    for (let j = 0; j <= y; j++) {
      if (i > 0) {
        dp[i][j] += dp[i - 1][j];
      }
      if (j > 0) {
        dp[i][j] += dp[i][j - 1];
      }
    }
  }

  return dp[x][y];
}

rl.question("Enter the number of test cases (N): ", (N) => {
  N = parseInt(N);

  if (N > 0 && N <= 100) {
    function processTestCase(index) {
      if (index === N) {
        rl.close();
        return;
      }

      rl.question(
        `Enter x and y for test case ${index + 1} separated by a space: `,
        (input) => {
          const [x, y] = input.split(" ").map(Number);

          if (x >= 0 && x <= 10 && y >= 0 && y <= 10) {
            const waysToReachScore = countScoreCombinations(x, y);
            console.log(
              `Number of ways to get to ${x}-${y}: ${waysToReachScore}`
            );

            processTestCase(index + 1);
          } else {
            console.log(
              "Invalid input for x or y. Please enter values within the specified constraints."
            );
            processTestCase(index);
          }
        }
      );
    }

    processTestCase(0);
  } else {
    console.log(
      "Invalid input for the number of test cases. Please enter a value within the specified constraints."
    );
    rl.close();
  }
});
