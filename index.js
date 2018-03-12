//Takes an array of arrays, each array a side to permutate
function* partnerRound(partnerGroups) {
  const partnerGroupLength = partnerGroups[0].length;
  //go through all the different combinations
  yield partnerGroups;
  for (let i = 0; i < partnerGroupLength - 1; i++) {
    partnerGroups.forEach((group, index) => {
      //do a rotation index number of times(so 0 times at index 0, 1 at index 1, etc)
      for (let j = 0; j <= index; j++) {
        group.unshift(group.pop());
      }
    });
    yield partnerGroups;
  }
}

function displayPartners(partnerGroups, dayNumber) {
  console.log(`For day ${dayNumber}:`);
  for (let i = 0; i < partnerGroups[0].length; i++) {
    let displayString = "";
    partnerGroups.forEach(
      partnerGroup => (displayString += " " + partnerGroup[i])
    );
    console.log(displayString);
  }
  console.log("\n");
}
// partnerRound([
//   [0, 1, 2, 3, 4, 5, 6, 7, 8],
//   [9, 10, 11, 12, 13, 14, 15, 16, 17],
//   [18, 19, 20, 21, 22, 23, 24, 25, 26]
// ]);
// //studentArray list of student ids
//partneringSize how many students in a partner group
function distributePartners(studentArray, partneringSize) {
  if (studentArray.length % partneringSize !== 0) return;
  //throw `Students must be a multiple of partneringSize. Student array ${studentArray} partneringSize ${partneringSize}`;
  const partnerGroups = [];
  const sliceCount = (studentArray.length / partneringSize) | 0;
  let index = 0;
  for (let i = 0; i < partneringSize; i++) {
    partnerGroups.push(studentArray.slice(index, index + sliceCount));
    index += sliceCount;
  }

  return partnerGroups;
}

//partneringSize
function printPartners(numberOfStudents, partneringSize) {
  const initialStudentIds = new Array(numberOfStudents)
    .fill(0)
    .map((item, index) => index);

  function* presentPartnering(studentIds) {
    if (!studentIds) {
      return;
    }
    //if there is only one student in the group, return
    if (studentIds.length <= partneringSize) {
      yield studentIds;
      return;
    }

    //distribute students into their groups
    const distributedPartners = distributePartners(studentIds, partneringSize);

    //obtain the generator for a round of partnering
    let partners = partnerRound(distributedPartners);
    let partner = partners.next();
    while (partner.value) {
      //get the partnering of the day
      yield partner.value;
      partner = partners.next();
    }

    //split all the different rings into new partners
    const newRings = distributedPartners.map(idArray =>
      presentPartnering(idArray)
    );
    //obtain generator from each ring
    let day = newRings.map(ringGenerator => ringGenerator.next());

    //combine each iteration together and present it as a day
    //while all days have a value
    while (day.every(ringIteration => !!ringIteration.value)) {
      //convert dayGenerators to arrays
      const dayIds = day.map(ring => ring.value);
      //merge day ids by going through each array and merging it
      const mergedIds = dayIds.reduce(
        (accumulator, dayIdArray) => {
          return accumulator.map((ring, ringNumber) =>
            ring.concat(dayIdArray[ringNumber])
          );
        },
        Array(partneringSize)
          .fill(0)
          .map(() => [])
      );
      //give new partnering to display
      yield mergedIds;
      //advance to next day
      day = newRings.map(ringGenerator => ringGenerator.next());
    }
  }

  let partners = presentPartnering(initialStudentIds);
  let partner = partners.next();
  let dayNumber = 1;
  while (partner.value) {
    displayPartners(partner.value, dayNumber++);
    partner = partners.next();
  }
}

//Using 27 people (which is 3 to the power of 3), split into partners of 3
printPartners(Math.pow(3, 3), 3);
