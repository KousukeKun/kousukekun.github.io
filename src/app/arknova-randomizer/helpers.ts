import {
  PlayerMapsResults,
  RandomizeResults,
  SettingsType,
  CompetitiveMode as Mode,
  EnhancedActionCardArr,
  DraftActionCardsResults,
  PlayAction,
  AllMainConservationProjects,
  AllMarineWorldsConservationProjects,
  ConservationProject,
} from './types-consts'
import { shuffle, slice } from 'lodash'

export const getRandomizeResults = (settings: SettingsType) => {
  const validationResults = validateSettingsData(settings)
  if (!validationResults.isValid) {
    throw new Error(`[validateSettingsData] - ${validationResults.message}`)
  }

  return {
    playerMaps: randomizePlayerMaps(settings),
    draftActionCards: randomizeDraftActionCards(settings),
    actionOrder: randomizePlayerActionsOrder(settings),
    firstPlayer: randomizeFirstPlayer(settings),
    conservationProjects: randomizeConservationProjects(settings),
    // bonusTiles: [ aaa, bbb, ccc, ddd, eee ],
  } as RandomizeResults
}

export const validateSettingsData = (settings: SettingsType) => {
  const {
    players,
    advanceZooMaps,
    beginnerZooMaps,
    competitiveMode,
  } = settings

  const maps = [...advanceZooMaps, ...beginnerZooMaps]

  const expectedMapsCount = competitiveMode === Mode.NORMAL ? (players.length * 2) : 1

  if (players.length < 2) {
    return {
      isValid: false,
      message: 'Please select at least 2 players.',
    }
  }

  if (maps.length < expectedMapsCount) {
    return {
      isValid: false,
      message: `Not enough maps selected. Please select at least ${expectedMapsCount} maps.`,
    }
  }

  return {
    isValid: true,
    message: 'ok',
  }
}

export const randomizePlayerMaps = (settings: SettingsType) => {
  const {
    players,
    advanceZooMaps,
    beginnerZooMaps,
    competitiveMode,
  } = settings

  const mapsPool = shuffle([...advanceZooMaps, ...beginnerZooMaps])

  const playerMapsResults = players.map(player => {
    const playerMaps = []
    if (competitiveMode === Mode.SAME_MAP) {
      playerMaps.push(mapsPool[0])
    } else {
      const map1 = mapsPool.shift()
      const map2 = mapsPool.shift()

      if (map1 === undefined || map2 === undefined) {
        throw new Error('[randomizePlayerMaps] - Not enough maps in the pool.')
      }

      playerMaps.push(map1)
      playerMaps.push(map2)
    }

    return {
      player,
      maps: playerMaps,
    } as PlayerMapsResults
  })

  return playerMapsResults
}

export const randomizeDraftActionCards = (settings: SettingsType) => {
  if (!settings.marineWorlds.draftingActionCards) {
    return []
  }

  const actionCardsPool = shuffle([ ...EnhancedActionCardArr])

  const results = settings.players.map(player => {
    const action1 = actionCardsPool.shift()
    const action2 = actionCardsPool.shift()
    const action3 = actionCardsPool.shift()

    if (action1 === undefined || action2 === undefined || action3 === undefined) {
      throw new Error('[randomizeDraftActionCards] - Not enough action cards in the pool.')
    }

    const actionCards = [action1, action2, action3]

    return {
      player,
      actionCards,
    } as DraftActionCardsResults
  })

  return results
}

export const randomizeFirstPlayer = (settings: SettingsType) => {
  const { players } = settings
  const playersPool = shuffle([ ...players ])

  return playersPool[0]
}

export const randomizePlayerActionsOrder = (settings: SettingsType) => {
  const { players } = settings

  return players.map(player => {
    const actionsPool = shuffle([
      PlayAction.BUILD,
      PlayAction.SPONSOR,
      PlayAction.ASSOCIATION,
      PlayAction.CARD,
    ])

    return {
      player,
      actionOrder: actionsPool,
    }
  })
}

export const randomizeConservationProjects = (settings: SettingsType) => {
  const { players, marineWorlds } = settings
  const totalProjects = (players.length < 4) ? 3 : 4

  let pools = []
  if (marineWorlds.newBaseConservationCards) {
    pools = [
      ...AllMainConservationProjects,
      ...AllMarineWorldsConservationProjects,
    ]
  } else {
    pools = [
      ...AllMainConservationProjects,
    ]
  }

  const results = slice(
    shuffle(pools),
    0,
    totalProjects,
  )

  return results
}
