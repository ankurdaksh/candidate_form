
import Candidate from '../models/CandidateModel.js';


 export const candiateController = async(req,res)=>{
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).send('Bad Request');
          }
        const documents = req.files.map((file) => ({
          fileName: file.originalname,
          fileType: file.mimetype.startsWith('image') ? 'image' : 'pdf',
          file: `/uploads/${file.filename}`,
        }));
       
    
        const candidate = new Candidate({ ...formData, documents });
        await candidate.save();
        res.status(200).send('Form submitted successfully');
      } catch (error) {
        res.status(500).send(error);
      }
}