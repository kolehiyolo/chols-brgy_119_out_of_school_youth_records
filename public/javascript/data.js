let persons = [];

let samplePerson = {
    _id: "0001",
    name: {
        last: "Last",
        first: "First",
        middle: "Middle",
        nickname: "Nickname",
        suffix: "Suffix",
    },
    image: "https://lh3.googleusercontent.com/drive-viewer/AFGJ81r7bDjkUhwHxxBQeBPdunQlxCdUwap6DdU2TYx5C8HJw8FArcxS6wFq679Ghcrmd6KpDPLaCVpHZI7gGl_ae5AJFsLBXg=w1920-h929",
    birthdate: "January 1, 2000",
    sex: "male",
    legalGuardian: {
        last: "Last",
        first: "First",
        middle: "Middle",
        nickname: "Nickname",
        suffix: "Suffix",
    },
    legalGuardianContact: 9012345678,
    address: {
        unit: "Room 2",
        lot: "Lot 1",
        street: "Kalye Street",
        remarks: "",
    },
    academic: {
        lastSchool: "Sample Elem. School",
        lastSchoolAttendance: 2019,
        lastLevel: 5,
    }
}

function clone() {
    let cloneNumber = 15;
    let zeroPrefix = ``;

    for (let i = 0; i < cloneNumber; i++) {
        persons.push(samplePerson);

        if (i / 100 > 1) {
            zeroPrefix = `00`;
        } else if (i / 10 > 1) {
            zeroPrefix = `000`;
        } else {
            zeroPrefix = `0000`;
        }

        persons[i]._id = `${zeroPrefix}${i}`;
        // console.log(persons[i]._id); 
    }
}

clone();

module.exports = {
    persons: persons
};