import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  residentialAddress: {
    street1: { type: String ,required: true },
    street2: { type: String ,required: true },
  },
  sameAsResidential: { type: Boolean, enum:[true , false] ,default: false },
  permanentAddress: {
    street1: { type: String },
    street2: { type: String },
  },
  documents: [
    {
      fileName: { type: String, required: true },
      fileType: { type: String, required: true, enum: ['image', 'pdf'] },
      file: { type: String, required: true },
    },
  ],
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;
