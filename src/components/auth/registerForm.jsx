import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { registerSchema } from "../../validators/authSchemas";
import { useRegister } from "../../hooks/useAuth";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const { mutate, isPending } = useRegister();

  const onSubmit = (data) => {
    mutate(data, {
      onError: (error) => {
        const message = error.response?.data?.message || "Registration failed";
        // map field-specific backend errors if present, otherwise show a root error
        if (error.response?.data?.field) {
          setError(error.response.data.field, { message });
        } else {
          setError("root", { message });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm w-full mx-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-xs text-red-500">{errors.root.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-4 py-3 hover:bg-[#FFC400] hover:text-black transition-colors disabled:opacity-50"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-xs text-center text-black/50 dark:text-white/50">
        Already have an account?{" "}
        <Link to="/login" className="text-black dark:text-white underline">
          Log in
        </Link>
      </p>
    </form>
  );
}