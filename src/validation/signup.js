import { object, string } from "yup";

const signupSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string()
    .min(5, "Incorrect password: Must be at least 5 characters long")
    .required(),
});

export default signupSchema;
