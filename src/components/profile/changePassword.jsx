import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../validators/userSchemas";
import { useChangePassword } from "../../hooks/useProfile";

export default function ChangePassword({ onClose }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(changePasswordSchema) });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => onClose(),
      onError: (error) => {
        const message = error.response?.data?.message || "Couldn't change password";
        setError("root", { message });
      },
    });
  };

  return (
    <form id="change-password-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Current password
        </label>
        <input
          type="password"
          {...register("currentPassword")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.currentPassword && <p className="text-xs text-red-500 mt-1.5">{errors.currentPassword.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          New password
        </label>
        <input
          type="password"
          {...register("newPassword")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.newPassword && <p className="text-xs text-red-500 mt-1.5">{errors.newPassword.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Confirm new password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1.5">{errors.confirmPassword.message}</p>}
      </div>

      {errors.root && <p className="text-xs text-red-500">{errors.root.message}</p>}
    </form>
  );
}
