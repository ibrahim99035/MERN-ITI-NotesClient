import { z } from "zod";

// PATCH /users/me
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50).optional(),
  email: z.string().email("Enter a valid email").optional(),
});

// PATCH /users/me/change-password
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // attaches error to the confirm field, not the whole form
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

// POST /users/me/profile-image
export const profileImageSchema = z.object({
  file: z
    .instanceof(File, { message: "Select an image file" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be under 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, or WebP allowed"
    ),
});