import { z } from "zod";

export const registerAccountValidationSchema = z
  .object({
    fullName: z
      .string({
        message: "You need to provide your full name.",
      })
      .nonempty("You need to provide your full name.")
      .min(3, { message: "Names can't be less than 3 characters." }),
    email: z
      .string({
        message: "You need to provide your email address.",
      })
      .nonempty("You need to provide your email address.")
      .email("Make sure you provide a valid email address."),
    password: z
      .string({
        message: "Please enter your account password.",
      })
      .nonempty("Please enter your account password.")
      .min(8, { message: "Passwords can't be less than 8 characters." }),
    confirmPassword: z
      .string({ message: "Please re-type your password." })
      .nonempty("Please re-type your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });
