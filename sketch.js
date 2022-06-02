function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows); 
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;

function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;
  
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++){
   for (let j = 0; j < rows; j++){
     grid[i][j] = floor(random(2));
    } 
  }
}

function draw(){
  background(0);
  
  
  
  for (let i = 0; i < cols; i++){
   for (let j = 0; j < rows; j++){
     let x = i * resolution;
     let y = j * resolution;
     if(grid[i][j] == 1) {
       fill(255);
       stroke(0);
       rect(x, y, resolution-1, resolution-1);       
      }     
    } 
  }
  
  let next = make2DArray(cols, rows);
  
  // compute next based on grid
   for (let i = 1; i < cols; i++){
   for (let j = 1; j < rows; j++){
     let state = grid[i][j];
     // Edges
     if (i == 0 || i == cols - 1 || j == 0 || j == rows-1){
       next[i][j] = state;
     } else {
     
     //Count live neighbors!
     let sum = 0;
     let neighbors = countNeighbors(grid, i, j);
     
     if (state == 0 && neighbors == 3) {
       next[i][j] =  1;     
     } else if (state == 1 && (neighbors < 2 || neighbors > 3)){
       next[i][j] = 0;
     } else {
       next[i][j] = state;
      }
    }     
  } 
   }
   
  grid = next;
    
}

function countNeighbors(grid, x, y){
  let sum = 0;
  for (let i = -1; i < 2; i++) {
     for (let j = -1; j < 2; j++) {
       sum += grid[x+i][y+j];   
    }
  }
  
  sum -= grid[x][y];
  return sum;
    
}









