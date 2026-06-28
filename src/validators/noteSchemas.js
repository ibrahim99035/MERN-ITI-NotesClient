import { z } from "zod";

const noteBase = {
  title: z.string().min(1, "Title is required").max(120, "Title is too long"),
  content: z.string().min(1, "Content can't be empty"),
  category: z.string().min(1, "Pick or enter a category").max(40),
  tags: z.array(z.string().min(1).max(20)).max(10, "Up to 10 tags").default([]),
  status: z.enum(["active", "archived"]).default("active"),
  isPinned: z.boolean().default(false),
};

// POST /notes
export const createNoteSchema = z.object(noteBase);

// PATCH /notes/:noteId
export const updateNoteSchema = z.object({
  title: noteBase.title.optional(),
  content: noteBase.content.optional(),
  category: noteBase.category.optional(),
  tags: noteBase.tags.optional(),
  status: noteBase.status.optional(),
  isPinned: noteBase.isPinned.optional(),
});