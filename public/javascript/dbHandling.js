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
            required: false
        },
        lot: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
            required: true,
        },
        // zone: {
        //     type: String,
        //     required: true,
        // },
        // barangay: {
        //     type: String,
        //     required: true,
        // },
        // city: {
        //     type: String,
        //     required: true,
        // },
        // province: {
        //     type: String,
        //     required: false,
        // },
        // postalCode: {
        //     type: String,
        //     required: false,
        // },
    },
    academic: {
        lastSchool: {
            type: String,
            required: true
        },
        lastSchoolAttendance: {
            type: Number,
            required: true
        },
        lastLevel: {
            type: Number,
            required: true
        },
        // outOfSchoolDuration: {
        //     type: String,
        //     required: true
        // },
        // expectedLevel: {
        //     type: String,
        //     required: true
        // }
    }
}

const personSchema = {
    name: {
        type: schema.name,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    legalGuardian: {
        type: schema.name,
        required: true,
    },
    legalGuardianContact: {
        type: String,
        required: true,
    },
    address: {
      type: schema.address,
      required: true,
    },
    academic: {
      type: schema.academic,
      required: true,
    }
}

module.exports = {
    schema: schema,
    personSchema: personSchema,
};