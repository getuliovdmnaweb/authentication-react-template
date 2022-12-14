import { object, string } from "yup";

const loginSchema = object({
  email: string().required().email(),
  password: string()
    .min(5, "Incorrect password: Must be at least 5 characters long")
    .required(),
});

export default loginSchema;
