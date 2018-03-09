//Takes an array of arrays, each array a side to permutate
function partnerRound(partnerGroups) {
  const partnerGroupLength = partnerGroups[0].length;
  //go through all the different combinations
  displayPartners(partnerGroups);
  for (let i = 0; i < partnerGroupLength - 1; i++) {
    partnerGroups.forEach((group, index) => {
      //do a rotation index number of times(so 0 times at index 0, 1 at index 1, etc)
      for (let j = 0; j <= index; j++) {
        group.unshift(group.pop());
      }
    });
    displayPartners(partnerGroups);
  }
}

function displayPartners(partnerGroups) {
  console.log("For this day:");
  for (let i = 0; i < partnerGroups[0].length; i++) {
    let displayString = "";
    partnerGroups.forEach(
      partnerGroup => (displayString += " " + partnerGroup[i])
    );
    console.log(displayString);
  }
  console.log("\n");
}
partnerRound([
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26]
]);
//studentArray list of student ids
//partneringSize how many students in a partner group
function distributePartners(studentArray, partneringSize) {
  if (studentArray.length % partneringSize !== 0)
    throw "Students must be a multiple of partneringSize";
  const partnerGroups = [];
  const sliceCount = (studentArray.length / partneringSize) | 0;
  let index = 0;
  for (let i = 0; i < partneringSize; i++) {
    partnerGroups.push(studentArray.slice(index, index + sliceCount));
    index += sliceCount;
  }
  console.log(partnerGroups);

  return partnerGroups;
}
// console.log(
//   distributePartners(
//     Array(27)
//       .fill(0)
//       .map((item, index) => index),
//     3
//   )
// );

//partneringSize
function printPartners(numberOfStudents, partneringSize) {
  const distributedPartners = distributePartners(
    new Array(numberOfStudents).fill(0).map((item, index) => index),
    partneringSize
  );
  partnerRound(distributedPartners);
}

printPartners(27, 3);
