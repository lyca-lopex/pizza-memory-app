export const ITEMS = ["card-front/pizza_bresaola.avif", "card-front/pizza_burrata.avif", "card-front/pizza_cacioepepe.avif", "card-front/pizza_capricciosa.avif", "card-front/pizza_cinqueformaggi.avif", "card-front/pizza_cinquevegani.avif", "card-front/pizza_cioccolata.avif", "card-front/pizza_diavola.avif", "card-front/pizza_funghi.avif", "card-front/pizza_lapatata.avif", "card-front/pizza_latartufata.avif", "card-front/pizza_margherita.avif", "card-front/pizza_marinara.avif", "card-front/pizza_mortaccitua.avif", "card-front/pizza_napoletana.avif", "card-front/pizza_parma.avif", "card-front/pizza_parmiggiana.avif", "card-front/pizza_prosciutto.avif", "card-front/pizza_salamenapoli.avif", "card-front/pizza_salsiccia.avif", "card-front/pizza_tonno.avif", "card-front/pizza_vegan_latartufata.avif", "card-front/pizza_vegan_margherita.avif", "card-front/pizza_vegan_parmigiana.avif", "card-front/pizza_vegan_verdura.avif", "card-front/pizza_verdura.avif"];

export const PIZZA_NAMES = ITEMS.map(item =>
  item
    .replace("card-front/", "")
    .replace(".avif", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase())
);

const CARD_NUMBER_EASY = 8;
const CARD_NUMBER_MEDIUM = 12;
const CARD_NUMBER_HARD = 16;

export const NUMBER_OF_CARDS = CARD_NUMBER_MEDIUM;

function getRandomSubset(arr: string[], size: number): string[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export function getPairedCards(): string[] {
  const selectedPizzas = getRandomSubset(PIZZA_NAMES, NUMBER_OF_CARDS);
  return selectedPizzas.flatMap(name => [
    `card-front/${name.toLowerCase().replace(/ /g, "_")}.avif`,
    name,
  ]);
}

export const CARDS = getPairedCards();

export const WAIT_TIMEOUT = 800;

export const MATCHING_CARDS = 2;

export const GAME_ACTIONS = {
  REVEAL: 'REVEAL',
  HIDE_REVEALED: 'HIDE_REVEALED',
  FIND: 'FIND',
  RESET: 'RESET',
} as const;
