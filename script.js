const DISPLAY_HEIGHT = 40;
const DISPLAY_SIZE = 100;

const displayMatrix = [];

let currentRenderValue = DISPLAY_HEIGHT - 2;

function renderCanvas() {
  let canvas = "<table>";

  displayMatrix.forEach((matrixRow, indexRow) => {
    canvas += "<tr>";

    matrixRow.forEach((matrixColumn, indexColumn) => {
      const canvasColumn = `<td class="color-${matrixColumn.value}" />`
      canvas += canvasColumn;
      matrixColumn.value = calculateCellValue(matrixColumn)(indexRow)(indexColumn);
    });
    canvas += "</tr>";
  });
  canvas += "</table>";

  document.getElementById("canvas").innerHTML = canvas;
}

function calculateCellValue(currentCell) {
  return function (currentRow) {
    return function (currentColumn) {
      if (currentRow === DISPLAY_HEIGHT - 1) return currentCell.value;
    
      const variation = parseInt(Math.ceil(Math.random() * (2)));
      const newValue = displayMatrix[currentRow + 1][currentColumn].value - variation;
    
      return newValue <= 0 ? 0 : newValue;
    }
  }
}

function setDefaultMatrix() {
  for (let rowPosition = 0; rowPosition < DISPLAY_HEIGHT; rowPosition++) {
    for (let columnPosition = 0; columnPosition < DISPLAY_SIZE; columnPosition++) {
      const defaultValue = {
        value: rowPosition < DISPLAY_HEIGHT - 1 ? 0 : 36,
      };

      if (!displayMatrix[rowPosition]) {
        displayMatrix.push([defaultValue])
      } else {
        displayMatrix[rowPosition] = [...displayMatrix[rowPosition], defaultValue];
      }
    }
  }
}

setDefaultMatrix();
setInterval(renderCanvas);