import joi from "joi";

export  const testSchema = joi.object({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId:joi.number().positive().greater(0).required(),
  teacherDisciplineId:joi.number().positive().greater(0).required(),
});

