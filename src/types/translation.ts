export type Translation = {
  title: string;
  language: {
    en: string;
    ja: string;
  };
  OGP: {
    title: string;
    description: string;
  };
  theme: {
    sr: string;
    light: string;
    dark: string;
    system: string;
  };
  sidebar: {
    search: {
      title: string;
      items: {
        ultimate: string;
        models: string;
        biomes: string;
        papers: string;
      };
    };
    simulator: {
      title: string;
      items: {
        enchantments: string;
      };
    };
    generator: {
      title: string;
      items: {
        recipes: string;
      };
    };
    competition: {
      title: string;
      items: {
        generators: string;
        agents: string;
      };
    };
  };
  home: {
    title: string;
    description: string;
  };
};
