export type TShow = {
  averageRuntime: string;
  type: string;
  genres: string[];
  id: number;
  image: { medium: string };
  language: string;
  name: string;
  officialSite: string;
  premiered: string;
  rating: { average: number };
  runtime: number;
  summary: string;
};

export type TShowMap = { [id: string]: TShow };

export type TGenresMap = { [genre: string]: number[] };
