import joi from "joi";

export  const testSchema = joi.object({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId:joi.number().strict().min(1).required(),
  teacherDisciplineId:joi.number().strict().min(1).required(),
});

