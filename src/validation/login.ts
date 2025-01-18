import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string({ message: "Please enter your email." })
    .nonempty()
    .email({ message: "Please make sure you type your email correctly." }),
  password: z.string({ message: "Please type in your password." }).nonempty(),
});
