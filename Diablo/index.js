const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function minGoldToPassLevel(
  monsters,
  durability,
  decreasePerMonster,
  repairCost
) {
  let remainingDurability = durability - decreasePerMonster * monsters;

  if (remainingDurability > 0) {
    return 0;
  }

  let repairsNeeded = Math.floor(
    Math.abs(remainingDurability) / durability + 1
  );

  let totalGoldNeeded = repairsNeeded * repairCost;

  return totalGoldNeeded;
}

function readAndProcessInput() {
  rl.question("Enter values (m d k c): ", function (input) {
    let values = input.split(" ").map(Number);

    if (values.length === 4) {
      let [m, d, k, c] = values;

      if (
        m >= 0 &&
        m <= 1000 &&
        k >= 0 &&
        k <= 1000 &&
        c >= 0 &&
        c <= 1000 &&
        d > 0 &&
        d <= 1000
      ) {
        let result = minGoldToPassLevel(m, d, k, c);

        // Print the result
        console.log(
          `Minimum amount of gold needed to pass the level: ${result}`
        );
      } else {
        console.log(
          "Invalid input. Please ensure that values meet the specified constraints."
        );
      }
    } else {
      console.log(
        "Invalid input. Please enter 4 integers separated by spaces."
      );
    }
    rl.close();
  });
}

readAndProcessInput();
