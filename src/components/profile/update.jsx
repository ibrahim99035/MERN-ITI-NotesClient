import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "../../validators/userSchemas";
import { useProfile, useUpdateProfile } from "../../hooks/useProfile";

export default function ProfileUpdate({ onClose }) {
  const { data } = useProfile();
  const { mutate, isPending } = useUpdateProfile();
  const user = data?.user || data;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    values: user ? { name: user.name, email: user.email } : undefined,
  });

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => onClose(),
      onError: (error) => {
        const message = error.response?.data?.message || "Couldn't update profile";
        setError("root", { message });
      },
    });
  };

  return (
    <form id="profile-update-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
      </div>

      {errors.root && <p className="text-xs text-red-500">{errors.root.message}</p>}
    </form>
  );
}
