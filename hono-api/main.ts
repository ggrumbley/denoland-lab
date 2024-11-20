import { Hono, type Context } from '@hono/hono';

const app = new Hono();

app.get('/', (ctx: Context) => {
  return ctx.text('Hello WORLD!');
});

interface Tree {
  id: string;
  species: string;
  age: number;
  location: string;
}

const oak: Tree = {
  id: '3',
  species: 'oak',
  age: 3,
  location: 'The Canyon',
};

const setItem = (key: string, value: Tree): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): Tree | null => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

const deleteItem = (key: string): void => {
  localStorage.removeItem(key);
};

// * CREATE
app.post('/trees', async (ctx: Context) => {
  const treeDetails = await ctx.req.json();
  const tree: Tree = treeDetails;

  setItem(`trees_${tree.id}`, tree);

  return ctx.json({
    message: `Added a ${tree.species} tree`,
  });
});

// * READ
app.get(`/trees/:id`, async (ctx: Context) => {
  const id = await ctx.req.param('id');
  const tree = getItem(`trees_${id}`);

  if (!tree) {
    return ctx.json({ message: 'tree not found' }, 404);
  }

  return ctx.json(tree);
});

// * UPDATE
app.put('/trees/:id', async (ctx: Context) => {
  const id = await ctx.req.param('id');
  const { species, age, location } = await ctx.req.json();

  const updatedTree: Tree = { id, species, age, location };

  setItem(`trees_${id}`, updatedTree);

  return ctx.json({
    message: `Tree has changed, ${location}, ${species}, ${age}`,
  });
});

// * DELETE
app.delete('/trees/:id', async (ctx: Context) => {
  const id = await ctx.req.param('id');
  deleteItem(`trees_${id}`);

  return ctx.json({
    message: `Tree ${id} has been cut down`,
  });
});
Deno.serve(app.fetch);
