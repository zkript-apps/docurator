import mongoose from 'mongoose'
const { Schema } = mongoose

const form138 = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
  },
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

  isFirstGradingSigned: Boolean,
  isSecondGradingSigned: Boolean,
  isThirdGradingSigned: Boolean,
  isFourthGradingSigned: Boolean,

  subjectRecords: [
    {
      subjectRecordId: {
        type: Schema.Types.ObjectId,
        ref: 'SubjectRecords',
      },
    },
  ],
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
  CancellationOfEligibilityDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Form138', form138)
