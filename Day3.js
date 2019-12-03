var fs = require('fs');

// Part 1

const start = new Date();

const myWires = {};

const lineArray = fs.readFileSync('Day3Input/Wires.txt').toString().split("\n");
for(i in lineArray) {
  myWires[`wire${i}`] = lineArray[i].split(',');
};

const startingCoordinates = { x: 0, y: 0 };
let currentWire;
let coordinates;
const coordinatesSetsForWires = {};

for (let key in myWires){
  if(myWires.hasOwnProperty(key)){
    coordinates = { ...startingCoordinates };
    currentWire = myWires[key];
    coordinatesSetsForWires[key] = [];

    for (i in currentWire) {
      const direction = currentWire[i].charAt(0);
      const distanceText = currentWire[i].slice(1);
      const distance = Number(distanceText);
      switch (direction) {
        case 'U':
          for(var i = coordinates.y + 1; i <= coordinates.y + distance; i++) {
            coordinatesSetsForWires[key].push({ ...coordinates, y: i})
          }
          break;
        case 'D':
          for(var i = coordinates.y - 1; i >= coordinates.y - distance; i--) {
            coordinatesSetsForWires[key].push({ ...coordinates, y: i})
          }
          break;
        case 'L':
          for(var i = coordinates.x - 1; i >= coordinates.x - distance; i--) {
            coordinatesSetsForWires[key].push({ ...coordinates, x: i})
          }
          break;
        case 'R':
          for(var i = coordinates.x + 1; i <= coordinates.x + distance; i++) {
            coordinatesSetsForWires[key].push({ ...coordinates, x: i})
          }
          break;
      }
      coordinates = { ...coordinatesSetsForWires[key][coordinatesSetsForWires[key].length - 1]}
    }
  }
}

const findCommonElements = (commonElements, currentWire, currentWireIndex) => {
  if (currentWireIndex === 0) return currentWire;
  return currentWire.filter(coordinates => {
    return commonElements.some(commonCoordinates => commonCoordinates.x === coordinates.x && commonCoordinates.y === coordinates.y);
  });
}

const intersections = Object.values(coordinatesSetsForWires).reduce(findCommonElements ,[]);

const makePositive = value => Math.abs(value);

const manhattanDistances = intersections.map(intersection => makePositive(intersection.x) + makePositive(intersection.y));

const manhattanDistanceOfClosestIntersection = Math.min( ...manhattanDistances );

console.log('Manhattan Distance of closest intersection of input wires is: ')
console.log(manhattanDistanceOfClosestIntersection);

const end = new Date();

const time = end.getTime() - start.getTime();

const timeInSeconds = time / 1000;

console.log(`Total Time Taken To Calculate: ${timeInSeconds}`);

// Part 2

const deepCoordinateComparisonIndexOf = (array, coordinates) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i].x == coordinates.x && array[i].y == coordinates.y) {
      return i;
    }
  }
  return -1;
}

const combinedStepsForIntersections = intersections.map(intersection => {
  const stepCounts = [];
  for (let key in coordinatesSetsForWires) {
    const currentCoorindateSet = coordinatesSetsForWires[key];
    stepCounts.push(deepCoordinateComparisonIndexOf(currentCoorindateSet, intersection) + 1);
  }
  return stepCounts.reduce((a, b) => a + b, 0);
});

const fewestCombinedStepsForIntersection = Math.min(...combinedStepsForIntersections);

console.log('Fewest combined steps the wires must take to reach an intersection: ')
console.log(fewestCombinedStepsForIntersection);

const end2 = new Date();

const time2 = end2.getTime() - start.getTime();

const timeInSeconds2 = time2 / 1000;

console.log(`Total Time Taken To Calculate: ${timeInSeconds2}`);