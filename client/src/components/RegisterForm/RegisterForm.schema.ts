import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z\s]+$/, "No special characters allowed")
    .min(2, { message: "Name must be between 2 and 16 characters long" })
    .max(16, { message: "Name must be between 2 and 16 characters long" }),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Email is not valid")
    .refine(
      (e) => e === "aljosabos@gmail.com",
      "This email is not in our database"
    ),

  status: z.string().max(64, "Status must be less than 64 characters long"),

  password: z
    .string("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .max(128, { message: "Password must be less than 120 characters long" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
