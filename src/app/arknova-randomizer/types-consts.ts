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
]

export const beginnerZooMapsArr = [
  ZooMap.MAP_0,
  ZooMap.MAP_A,
] as ZooMap[]

export type SettingsType = {
  players: WorkerColor[]
  advanceZooMaps: ZooMap[]
  beginnerZooMaps: ZooMap[]
  competitiveMode: 'normal' | 'same-map'
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
  competitiveMode: 'normal',
  marineWorlds: {
    draftingActionCards: true,
    newBaseConservationCards: true,
    newBonusTiles: true,
  }
} as SettingsType
