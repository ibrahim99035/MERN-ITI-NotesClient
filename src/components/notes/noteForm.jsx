import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNoteSchema, updateNoteSchema } from "../../validators/noteSchemas";

const CATEGORIES = ["Work", "Personal", "Study", "Ideas", "Tasks"];

export default function NoteForm({ defaultValues, onSubmit, isPending, submitLabel = "Save" }) {
  const isEdit = !!defaultValues;
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateNoteSchema : createNoteSchema),
    defaultValues: defaultValues || {
      title: "",
      content: "",
      category: "",
      tags: [],
      status: "active",
      isPinned: false,
    },
  });

  const tags = watch("tags") || [];

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (trimmed.length > 20) return;
    if (tags.includes(trimmed)) return;
    if (tags.length >= 10) return;
    setValue("tags", [...tags, trimmed], { shouldValidate: true });
    setTagInput("");
  };

  const removeTag = (index) => {
    setValue("tags", tags.filter((_, i) => i !== index), { shouldValidate: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const onFormSubmit = (data) => {
    onSubmit(data, { setError });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Title
        </label>
        <input
          type="text"
          {...register("title")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
          placeholder="Note title"
        />
        {errors.title && <p className="text-xs text-red-500 mt-1.5">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Content
        </label>
        <textarea
          rows={8}
          {...register("content")}
          className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400] resize-y min-h-[160px]"
          placeholder="Write your note..."
        />
        {errors.content && <p className="text-xs text-red-500 mt-1.5">{errors.content.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
            Category
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("category")}
              list="category-suggestions"
              className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
              placeholder="Pick or type..."
            />
            <datalist id="category-suggestions">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          {errors.category && <p className="text-xs text-red-500 mt-1.5">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full border border-black/20 dark:border-white/20 bg-transparent px-3 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status && <p className="text-xs text-red-500 mt-1.5">{errors.status.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest border border-black/20 dark:border-white/20 text-black/70 dark:text-white/70"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="text-black/40 dark:text-white/40 hover:text-red-500 leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-black/20 dark:border-white/20 bg-transparent px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-[#FFC400]"
            placeholder="Type a tag and press Enter"
          />
          <button
            type="button"
            onClick={addTag}
            className="text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Add
          </button>
        </div>
        {errors.tags && <p className="text-xs text-red-500 mt-1.5">{errors.tags.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("isPinned")}
            className="w-4 h-4 accent-[#FFC400]"
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
            Pin this note
          </span>
        </label>
      </div>

      {errors.root && (
        <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2">
          {errors.root.message}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-6 py-3 hover:bg-[#FFC400] hover:text-black transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
