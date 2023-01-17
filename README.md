## Getting Started

First, get the API key from your verified account at [https://docurator.jpmadrigal.com/developer](https://docurator.jpmadrigal.com/developer)


It should look something like this:
```bash
pri_U2FsdGVkX19doVqpqesB/p2SAkG56ulRiP4UPUJyajshKSJLAdjhfJHjhal
```

Copy it and paste it into your code and set it as a header for your requests:

```bash
const params = {
     method: method,
     url: `${String(<Api-Url>)}${endpoint}`,
     headers: { 
       "Content-Type": "application/json",
       ...({ Authorization: `Bearer: ${<YourApiKey>}` })
     },
};
```

You can now start testing the endpoints.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be now accessed on [https://docuapi.jpmadrigal.com](https://docuapi.jpmadrigal.com/).

## Test it out!

Make a GET request using the endpoint:

```bash
https://docuratorapi.jpmadrigal.com/api/hello
```

You should get this message:

```bash
Hello World
```

If you get this message, it means you are authorized to access the DoCurator endpoints.

## Endpoints list

Here is the list of endpoints you can access in this API
- /students
- /subject-records
- /form138
- /form137
- /birth-certificates
- /good-moral-certificates
- /claim-access
- /schools

## Data fields (MongoDB Schema)

/students
```bash
  lrn: {
    type: String,
    unique: true,
    minlength: 12,
    maxlength: 12,
    required: true,
  },
  studentClaimedAt: Date,
  claimedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  statusOfApplicant: {
    type: String,
    enum: ['Freshmen', 'Transferee', 'Returnee', 'Shifter', 'Continuer'],
    required: true,
  },
  schoolName: String,
  dateOfBirth: Date,
  placeOfBirthProvince: String,
  placeOfBirthTown: String,
  placeOfBirthBarangay: String,
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say', null],
  },
  civilStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed', null],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: String,
  mothersName: String,
  mothersOccupation: String,
  fathersName: String,
  fathersOccupation: String,
  guardiansName: String,
  guardiansOccupation: String,
  guardiansPhoneNumber: String,
  houseNumber: String,
  street: String,
  barangay: String,
  town: String,
  province: String,
  zipCode: String
```

/subject-records
```bash
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: String,
  firstGrading: Number,
  secondGrading: Number,
  thirdGrading: Number,
  fourthGrading: Number,
  finalGrade: Number,
  remarks: String,
  academicYear: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  gradeLevel: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  }
```

/form138
```bash
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  academicYear: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  attendanceId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  principal: {
    type: String,
    required: true,
  },
  gradeLevel: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  promotedTo: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  certificateOfTranferDate: Date,
  certificateOfTranferTeacher: String,
  certificateOfTranferPrincipal: String,

  cancellationOfEligibilityAdmittedIn: String,
  cancellationOfEligibilityGrade: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  },
  CancellationOfEligibilityDate: Date
```

/form137
```bash
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  educationLevel: {
    type: String,
    enum: ['Elementary', 'High School'],
  },
```

/birth-certificates
```bash
  lrn: {
    type: String,
    unique: true,
    minlength: 12,
    maxlength: 12,
  },
  placeOfBirthProvince: String,
  placeOfBirthMunicipality: String,
  placeOfBirthNameOfHospital: String,
  placeOfBirthIsInsideCityLimits: Boolean,

  mothersAddressProvince: String,
  mothersAddressMunicipality: String,
  mothersAddressHouseNumber: String,
  mothersAddressStreet: String,
  mothersAddressIsInsideCityLimits: Boolean,
  mothersAddressIsOnAFarm: Boolean,

  childsLastName: String,
  childsFirstName: String,
  childsMiddleName: String,
  childsSex: {
    type: String,
    enum: ['F', 'M'],
  },
  childsTypeOfBirth: {
    type: String,
    enum: ['Single', 'Twin', 'Triplet', 'etc'],
  },
  childsTypeOfBirthEtc: String,
  childsPosition: {
    type: String,
    enum: ['1st', '2nd', '3rd', 'etc', ''],
  },
  childPositionEtc: String,
  childsDateOfBirth: Date,

  fathersLastName: String,
  fathersFirstName: String,
  fathersMiddleName: String,
  fathersReligion: String,
  fathersNationality: String,
  fathersRace: String,
  fathersAgeTimeOfBirth: Number,
  fathersPlaceOfBirth: String,
  fathersUsualOccupation: String,
  fathersKindOfIndustry: String,

  mothersLastName: String,
  mothersFirstName: String,
  mothersMiddleName: String,
  mothersReligion: String,
  mothersNationality: String,
  mothersRace: String,
  mothersAgeAtTimeOfBirth: Number,
  mothersPlaceOfBirth: String,
  mothersPreviousDeliveries: Number,
  mothersNumberOfAliveChildren: Number,
  mothersNumberOfChildremBornAliveButNowDead: Number,
  mothersNumberOfDeadChildren: Number,

  informantsFullName: String,
  informantsAddress: String,

  mothersMailingAddressHouseNumber: String,
  mothersMailingAddressStreet: String,
  mothersMailingAddressMunicipality: String,
  mothersMailingAddressProvince: String,

  birthAttendantsFullName: String,
  birthAttendantsAddress: String,
  birthAttendantsDateSigned: String,
  birthAttendantsTitle: {
    type: String,
    enum: ['M.D.', 'Midwife', 'Nurse', 'other', ''],
  },
  birthAttendantsOtherTitle: String,

  receivedByFullName: String,
  receivedByTitleOrPosition: String,
  dateReceived: Date,

  givenNameFromSupplementalReport: String,
  givenNameSupplied: Date,
  lengthOfPregnancy: Number,

  weightAtBirthPound: Number,
  weightAtBirthOunce: Number,

  isLegitimate: Boolean,

  parentsMarriageDate: Date,
  parentsMarriageMunicipality: String,
  parentsMarriageProvince: String,

  preparedByFullName: String,
  preparedByTitleOrPosition: String,
  datePrepared: Date,

  birthReferenceNumber: String
```

/good-moral-certificates
```bash
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  gradeLevel: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  academicYear: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  signedBy: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateGiven: {
    type: Date,
    required: true,
  }
```

/good-moral-certificates
```bash
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  gradeLevel: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  academicYear: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  signedBy: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateGiven: {
    type: Date,
    required: true,
  }
```

/claim-access
```bash
  lrn: String,
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  accessClaimedAt: {
    type: Date,
    default: Date.now,
  },
```
