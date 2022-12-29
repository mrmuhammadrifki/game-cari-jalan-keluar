let col = 0;
let row = 7;
let grid = getGridLayout();
let type = {
  block: 0,
  path: 1,
  bonus: 2,
  finish: 3,
  character: 4,
};

function getGridLayout() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 3],
    [0, 1, 1, 1, 2, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 2, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [4, 1, 1, 1, 1, 1, 1, 1],
  ];
}

function renderGrid(grid) {
  const tbody = document.querySelector("tbody");
  const blockType = ["block", "path", "bonus", "finish", "character"];

  const data = grid.map((rowVal) => {
    const col = rowVal.map((colVal) => {
      return `<td class="${blockType[colVal]}">&nbsp;</td>`;
    });
    return `<tr>${col.join("")}</tr>`;
  });

  tbody.innerHTML = data.join("");
}

function handleUp() {
  const up = row - 1;

  if (up >= 0 && grid[up][col] !== 0) {
    grid[row][col] = 1;
    if (up === 0 && grid[up][col] === 3) {
      alert("Selamat Anda berhasil finish");
      grid[up][col] = 3;
      row = 7;
      col = 0;
      grid[row][col] = 4;
      grid[1][4] = 2;
      grid[3][2] = 2;

      let score = document.querySelector("#total-score");
      score.innerHTML = Number(score.innerHTML) + 1;

      renderGrid(grid);
      return;
    }

    grid[up][col] = 4;
    row--;

    renderGrid(grid);
  }
}

function handleDown() {
  const down = row + 1;

  if (down <= 7 && grid[down][col] !== 0) {
    grid[row][col] = 1;
    grid[down][col] = 4;
    row++;

    renderGrid(grid);
  }
}

function handleLeft() {
  const left = col - 1;
  if (left >= 0 && grid[row][left] !== 0) {
    grid[row][col] = 1;
    grid[row][left] = 4;
    col--;

    renderGrid(grid);
  }
}

// contoh
function handleRight() {
  const right = col + 1;

  if (right < 8 && grid[row][right] !== 0) {
    grid[row][col] = 1;
    grid[row][right] = 4;
    col++;

    renderGrid(grid);
  }
}

if (grid[row][col] === 3) {
  alert("Ok");
}

document.getElementById("up").addEventListener("click", handleUp);
document.getElementById("down").addEventListener("click", handleDown);
document.getElementById("left").addEventListener("click", handleLeft);
document.getElementById("right").addEventListener("click", handleRight);

renderGrid(grid);
