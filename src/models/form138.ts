import mongoose from 'mongoose'
const { Schema } = mongoose

const form138 = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
  },
  lrn: {
    type: String,
    unique: true,
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
  narrativeReportFirstGrading: String,
  narrativeReportSecondGrading: String,
  narrativeReportThirdGrading: String,
  narrativeReportFourthGrading: String,

  parentsSignatureFirstGrading: String,
  parentsSignatureSecondGrading: String,
  parentsSignatureThirdGrading: String,
  parentsSignatureFourthGrading: String,

  subjectRecords: [Schema.Types.ObjectId],
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
  promotedTo: {
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  certificateOfTranferDate: Date,
  certificateOfTranferTeacher: String,
  certificateOfTranferPrincipal: String,

  CancellationOfEligibilityAdmittedIn: String,
  CancellationOfEligibilityGrade: {
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  CancellationOfEligibilityDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Form137', form138)
