'use client'

import { useState, useMemo } from 'react'
import {
  Typography,
  Grid,
} from '@mui/material'
import MultipleSelectToggleButton from './components/multiple-select-toggle-button'
import {
  allWorkerColors,
  SettingsType,
  defaultSettings,
  WorkerColor,
  ZooMap,
  beginnerZooMapsArr,
  advanceZooMapsArr,
} from './types-consts'
import { SettingsContext } from './settings-context'
import CheckboxTree from './components/checkbox-tree'

export default function ArkNovaRandomizer() {

  const [settings, setSettings] = useState<SettingsType>(defaultSettings)

  const { players, beginnerZooMaps, advanceZooMaps } = settings

  const handleOnChangePlayers = (_event: React.MouseEvent<HTMLElement>, updatedValues: string[]) => {
    setSettings({
      ...settings,
      players: updatedValues as WorkerColor[],
    })
  }

  const handleOnChangeAdvanceZooMaps = (_event: React.ChangeEvent<HTMLInputElement>, updatedValues: string[]) => {
    setSettings({
      ...settings,
      advanceZooMaps: updatedValues as ZooMap[],
    })
  }

  const handleOnChangeBeginnerZooMaps = (_event: React.ChangeEvent<HTMLInputElement>, updatedValues: string[]) => {
    setSettings({
      ...settings,
      beginnerZooMaps: updatedValues as ZooMap[],
    })
  }

  const contextValue = useMemo(() => ({ settings, setSettings }), [settings, setSettings])

  return (
    <SettingsContext.Provider value={contextValue}>
      <Typography variant="h4" id="arknova-randomizer-title" gutterBottom>
        ArkNova Randomizer
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Select Players
          </Typography>
          <MultipleSelectToggleButton
            id="select-players"
            items={allWorkerColors}
            selectedValues={players}
            onChange={handleOnChangePlayers}
          />
          <Typography variant="body2" gutterBottom>
            {players.length} players selected
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Map Settings
          </Typography>
          <CheckboxTree
            id="select-advance-maps"
            rootLabel="Advance Maps"
            items={advanceZooMapsArr}
            selectedValues={advanceZooMaps}
            onChange={handleOnChangeAdvanceZooMaps}
          />
          <CheckboxTree
            id="select-advance-maps"
            rootLabel="Beginner Maps"
            items={beginnerZooMapsArr}
            selectedValues={beginnerZooMaps}
            onChange={handleOnChangeBeginnerZooMaps}
          />
        </Grid>
      </Grid>
    </SettingsContext.Provider>
  )
}
