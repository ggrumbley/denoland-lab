import {
  pgTable,
  serial,
  text,
  foreignKey,
  integer,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const dinosaurs = pgTable('dinosaurs', {
  id: serial().primaryKey().notNull(),
  name: text(),
  description: text(),
});

export const tasks = pgTable(
  'tasks',
  {
    id: serial().primaryKey().notNull(),
    dionsaurId: integer('dionsaur_id'),
    description: text(),
    dateCreated: timestamp('date_created', { mode: 'string' }).defaultNow(),
    isComplete: boolean('is_complete'),
  },
  (table) => {
    return {
      tasksDinosaurIdFkey: foreignKey({
        columns: [table.dionsaurId],
        foreignColumns: [dinosaurs.id],
        name: 'tasks_dinosaur_id_fkey',
      }),
    };
  }
);
