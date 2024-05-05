import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  date: Yup.array().min(1),
});

export const validationSchemaAdmin = Yup.object().shape({
  user: Yup.object().required("Name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  date: Yup.array().min(1),
});
