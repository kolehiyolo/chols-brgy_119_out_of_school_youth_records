const schema = {
    name: {
        last: {
            type: String,
            required: true
        },
        first: {
            type: String,
            required: true,
        },
        middle: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,
        },
        suffix: {
            type: String,
            required: false,
        },
    },
    address: {
        unit: {
            type: String,
            required: true
        },
        lot: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true,
        },
        zone: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
            required: true,
        },
        barangay: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: false,
        },
        postalCode: {
            type: String,
            required: false,
        },
    },
    academic: {
        lastSchool: {
            type: String,
            required: true
        },
        lastSchoolAttendance: {
            type: Date,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        outOfSchoolDuration: {
            type: String,
            required: true
        },
        expectedLevel: {
            type: String,
            required: true
        }
    }
}

const personSchema = {
    name: {
        type: schema.name,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    // address: {
    //   type: schema.address,
    //   required: true,
    // },
    legalGuardian: {
        type: schema.name,
        required: true,
    },
    legalGuardianContact: {
        type: String,
        required: true,
    },
    // academics: {
    //   type: academicSchema,
    //   required: true,
    // }
}

module.exports = {
    schema: schema,
    personSchema: personSchema,
};