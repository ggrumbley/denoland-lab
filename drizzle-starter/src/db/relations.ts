import { relations } from 'drizzle-orm/relations';
import { dinosaurs, tasks } from './schema.ts';

export const tasksRelations = relations(tasks, ({ one }) => ({
  dinosaur: one(dinosaurs, {
    fields: [tasks.dionsaurId],
    references: [dinosaurs.id],
  }),
}));

export const dinosaursRelations = relations(dinosaurs, ({ many }) => ({
  tasks: many(tasks),
}));
