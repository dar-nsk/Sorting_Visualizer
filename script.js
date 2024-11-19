// DOM Elements
const arrayContainer = document.getElementById('arrayContainer');
const generateArrayBtn = document.getElementById('generateArray');
const bubbleSortBtn = document.getElementById('bubbleSort');
const mergeSortBtn = document.getElementById('mergeSort');
const timeTakenElem = document.getElementById('timeTaken').querySelector('span');
const comparisonsElem = document.getElementById('comparisons').querySelector('span');
const swapsElem = document.getElementById('swaps').querySelector('span');

// Global Variables
let array = [];
let comparisons = 0;
let swaps = 0;

// Generate a random array
function generateArray() {
  array = [];
  comparisons = 0;
  swaps = 0;
  updateInfo(); // Reset info
  bubbleSortBtn.disabled = false;
  mergeSortBtn.disabled = false;
  arrayContainer.innerHTML = ''; // Clear previous bars
  for (let i = 0; i < 20; i++) {
    const value = Math.floor(Math.random() * 100) + 10; // Random values between 10 and 110
    array.push(value);
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`;
    arrayContainer.appendChild(bar);
  }
}

// Update Additional Info
function updateInfo(time = 0) {
  timeTakenElem.textContent = `${time} ms`;
  comparisonsElem.textContent = comparisons;
  swapsElem.textContent = swaps;
}

// Bubble Sort Visualization
async function bubbleSort() {
  const bars = document.getElementsByClassName('bar');
  const startTime = performance.now();
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      comparisons++;
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';
      if (array[j] > array[j + 1]) {
        // Swap the bars
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        bars[j].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
      }
      await new Promise(resolve => setTimeout(resolve, 50)); // Delay for visualization
      bars[j].style.backgroundColor = '#007bff';
      bars[j + 1].style.backgroundColor = '#007bff';
    }
    bars[array.length - i - 1].style.backgroundColor = 'green'; // Sorted bar
  }
  const endTime = performance.now();
  updateInfo(Math.round(endTime - startTime));
}

// Merge Sort Visualization
async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const tempArray = [];
  const bars = document.getElementsByClassName('bar');
  let i = start, j = mid + 1;

  while (i <= mid && j <= end) {
    comparisons++;
    bars[i].style.backgroundColor = 'yellow';
    bars[j].style.backgroundColor = 'yellow';

    if (array[i] <= array[j]) {
      tempArray.push(array[i++]);
    } else {
      tempArray.push(array[j++]);
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  while (i <= mid) {
    tempArray.push(array[i++]);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  while (j <= end) {
    tempArray.push(array[j++]);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  for (let k = start; k <= end; k++) {
    swaps++;
    array[k] = tempArray[k - start];
    bars[k].style.height = `${array[k] * 3}px`;
    bars[k].style.backgroundColor = 'green';
  }
}

// Event Listeners
generateArrayBtn.addEventListener('click', generateArray);
bubbleSortBtn.addEventListener('click', bubbleSort);
mergeSortBtn.addEventListener('click', async () => {
  const startTime = performance.now();
  await mergeSort();
  const endTime = performance.now();
  updateInfo(Math.round(endTime - startTime));
});
