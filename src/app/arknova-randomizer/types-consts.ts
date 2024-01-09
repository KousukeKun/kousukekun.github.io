export enum WorkerColor {
  BLUE = 'blue',
  YELLOW = 'yellow',
  RED = 'red',
  BLACK = 'black',
}

export enum ZooMap {
  MAP_1 = 'Map 1 - Observation Tower',
  MAP_2 = 'Map 2 - Outdoor Areas',
  MAP_3 = 'Map 3 - Silver Lake',
  MAP_4 = 'Map 4 - Commercial Harbor',
  MAP_5 = 'Map 5 - Park Restaurant',
  MAP_6 = 'Map 6 - Research Institute',
  MAP_7 = 'Map 7 - Ice Cream Parlors',
  MAP_8 = 'Map 8 - Hollywood Hills',
  MAP_9 = 'Map 9 - Geographical Zoo',
  MAP_10 = 'Map 10 - Rescue Station',
  MAP_A = 'Map A',
  MAP_0 = 'Map 0',
}

export enum EnhancedActionCard {
  CARD_1 = 'Card 1',
  CARD_2 = 'Card 2',
  CARD_3 = 'Card 3',
  CARD_4 = 'Card 4',
  SPONSOR_1 = 'Sponsor 1',
  SPONSOR_2 = 'Sponsor 2',
  SPONSOR_3 = 'Sponsor 3',
  SPONSOR_4 = 'Sponsor 4',
  ANIMAL_1 = 'Animal 1',
  ANIMAL_2 = 'Animal 2',
  ANIMAL_3 = 'Animal 3',
  ANIMAL_4 = 'Animal 4',
  ASSOCIATION_1 = 'Association 1',
  ASSOCIATION_2 = 'Association 2',
  ASSOCIATION_3 = 'Association 3',
  ASSOCIATION_4 = 'Association 4',
  BUILD_1 = 'Build 1',
  BUILD_2 = 'Build 2',
  BUILD_3 = 'Build 3',
  BUILD_4 = 'Build 4',
}

export enum PlayAction {
  ANIMAL = 'animal',
  BUILD = 'build',
  SPONSOR = 'sponsor',
  ASSOCIATION = 'association',
  CARD = 'card',
}

export enum CompetitiveMode {
  NORMAL = 'normal',
  SAME_MAP = 'same-map',
}

export enum ConservationProject {
  SPECIES_DIVERSITY = 'Species Diversity',
  HABITAT_DIVERSITY = 'Habitat Diversity',
  AFRICA = 'Africa',
  AMERICA = 'America',
  AUSTRALIA = 'Australia',
  ASIA = 'Asia',
  EUROPE = 'Europe',
  PRIMATES = 'Primates',
  REPTILES = 'Reptiles',
  PREDATORS = 'Predators',
  HERBIVORES = 'Herbivores',
  BIRDS = 'Birds',
  SEA_ANIMALS = 'Sea Animals',
}

export const AllMainConservationProjects = [
  ConservationProject.SPECIES_DIVERSITY,
  ConservationProject.HABITAT_DIVERSITY,
  ConservationProject.AFRICA,
  ConservationProject.AMERICA,
  ConservationProject.AUSTRALIA,
  ConservationProject.ASIA,
  ConservationProject.EUROPE,
  ConservationProject.PRIMATES,
  ConservationProject.REPTILES,
  ConservationProject.PREDATORS,
  ConservationProject.HERBIVORES,
  ConservationProject.BIRDS,
] as ConservationProject[]

export const AllMarineWorldsConservationProjects = [
  ConservationProject.SEA_ANIMALS,
] as ConservationProject[]

export const allWorkerColors = [
  WorkerColor.BLUE,
  WorkerColor.YELLOW,
  WorkerColor.RED,
  WorkerColor.BLACK,
] as WorkerColor[]

export const advanceZooMapsArr = [
  ZooMap.MAP_1,
  ZooMap.MAP_2,
  ZooMap.MAP_3,
  ZooMap.MAP_4,
  ZooMap.MAP_5,
  ZooMap.MAP_6,
  ZooMap.MAP_7,
  ZooMap.MAP_8,
  ZooMap.MAP_9,
  ZooMap.MAP_10,
] as ZooMap[]

export const beginnerZooMapsArr = [
  ZooMap.MAP_0,
  ZooMap.MAP_A,
] as ZooMap[]

export const EnhancedActionCardArr = [
  EnhancedActionCard.CARD_1,
  EnhancedActionCard.CARD_2,
  EnhancedActionCard.CARD_3,
  EnhancedActionCard.CARD_4,
  EnhancedActionCard.SPONSOR_1,
  EnhancedActionCard.SPONSOR_2,
  EnhancedActionCard.SPONSOR_3,
  EnhancedActionCard.SPONSOR_4,
  EnhancedActionCard.ANIMAL_1,
  EnhancedActionCard.ANIMAL_2,
  EnhancedActionCard.ANIMAL_3,
  EnhancedActionCard.ANIMAL_4,
  EnhancedActionCard.ASSOCIATION_1,
  EnhancedActionCard.ASSOCIATION_2,
  EnhancedActionCard.ASSOCIATION_3,
  EnhancedActionCard.ASSOCIATION_4,
  EnhancedActionCard.BUILD_1,
  EnhancedActionCard.BUILD_2,
  EnhancedActionCard.BUILD_3,
  EnhancedActionCard.BUILD_4,
] as EnhancedActionCard[]

export type SettingsType = {
  players: WorkerColor[]
  advanceZooMaps: ZooMap[]
  beginnerZooMaps: ZooMap[]
  competitiveMode: CompetitiveMode
  marineWorlds: {
    draftingActionCards: boolean
    newBaseConservationCards: boolean
    newBonusTiles: boolean
  }
}

export const defaultSettings = {
  players: [ ...allWorkerColors ],
  advanceZooMaps: [ ...advanceZooMapsArr ],
  beginnerZooMaps: [],
  competitiveMode: CompetitiveMode.NORMAL,
  marineWorlds: {
    draftingActionCards: true,
    newBaseConservationCards: true,
    newBonusTiles: true,
  }
} as SettingsType

export type RandomizeResults = {
  playerMaps: PlayerMapsResults[]
  draftActionCards: DraftActionCardsResults[]
  actionOrder: ActionOrderResults[]
  firstPlayer?: WorkerColor
  conservationProjects: ConservationProject[]
  // bonusTiles: [ aaa, bbb, ccc, ddd, eee ]
}

export type PlayerMapsResults = {
  player: WorkerColor
  maps: ZooMap[]
}

export type DraftActionCardsResults = {
  player: WorkerColor
  actionCards: EnhancedActionCard[]
}

export type ActionOrderResults = {
  player: WorkerColor
  actionOrder: PlayAction[]
}
