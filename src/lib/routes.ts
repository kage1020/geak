export const routes = {
  root: '/',
  generator: {
    root: '/generator',
    recipes: '/generator/recipes',
  },
  search: {
    root: '/search',
    models: '/search/models',
    seeds: '/search/seeds',
    biomes: '/search/biomes',
    papers: '/search/papers',
  },
  simulator: {
    root: '/simulator',
    enchantments: '/simulator/enchantments',
  },
  competition: {
    root: '/competition',
    generators: '/competition/generators',
    agents: '/competition/agents',
  },
} as const;
