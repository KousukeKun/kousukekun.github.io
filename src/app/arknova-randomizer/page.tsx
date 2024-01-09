'use client'

import { useState, useMemo } from 'react'
import {
  Typography,
  Grid,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material'
import MultipleSelectToggleButton from './components/multiple-select-toggle-button'
import {
  allWorkerColors,
  SettingsType,
  defaultSettings,
  WorkerColor,
  ZooMap,
  // beginnerZooMapsArr,
  advanceZooMapsArr,
} from './types-consts'
import { SettingsContext } from './settings-context'
import CheckboxTree from './components/checkbox-tree'

export default function ArkNovaRandomizer() {

  const [settings, setSettings] = useState<SettingsType>(defaultSettings)

  const {
    players,
    // beginnerZooMaps,
    advanceZooMaps,
    competitiveMode,
    marineWorlds : {
      draftingActionCards,
      newBaseConservationCards,
      newBonusTiles,
    },
  } = settings

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

  // const handleOnChangeBeginnerZooMaps = (_event: React.ChangeEvent<HTMLInputElement>, updatedValues: string[]) => {
  //   setSettings({
  //     ...settings,
  //     beginnerZooMaps: updatedValues as ZooMap[],
  //   })
  // }

  const handleOnChangeCompetitiveMode = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setSettings({
        ...settings,
        competitiveMode: event.target.value as 'normal' | 'same-map',
      })
    }
  }

  const handleOnChangeDraftingActionCards = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSettings({
      ...settings,
      marineWorlds: {
        ...settings.marineWorlds,
        draftingActionCards: checked,
      },
    })
  }

  const handleOnChangeNewBaseConservationCards = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSettings({
      ...settings,
      marineWorlds: {
        ...settings.marineWorlds,
        newBaseConservationCards: checked,
      },
    })
  }

  const handleOnChangeNewBonusTiles = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSettings({
      ...settings,
      marineWorlds: {
        ...settings.marineWorlds,
        newBonusTiles: checked,
      },
    })
  }

  const handleRandomize = () => {
    console.log(settings)
  }

  const contextValue = useMemo(() => ({ settings, setSettings }), [settings, setSettings])

  return (
    <SettingsContext.Provider value={contextValue}>
      <Typography variant="h4" id="arknova-randomizer-title" gutterBottom>
        ArkNova Randomizer
      </Typography>

      <Grid container id="setup-container">
        <Grid item xs={12} md={12} xl={3}>
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
        <Grid item xs={12} md={4} xl={3}>
          <Typography variant="h5" gutterBottom>
            Marine Worlds Expansion
          </Typography>
          <FormGroup>
            <FormControlLabel
              label="Drafting new Action Cards"
              control={<Checkbox checked={draftingActionCards} onChange={handleOnChangeDraftingActionCards} />}
            />
            <FormControlLabel
              label="New base conservation projects cards"
              control={<Checkbox checked={newBaseConservationCards} onChange={handleOnChangeNewBaseConservationCards} />}
            />
            <FormControlLabel
              label="New bonus tiles"
              control={<Checkbox checked={newBonusTiles} onChange={handleOnChangeNewBonusTiles} />}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <Typography variant="h5" gutterBottom>
            Competitive Mode
          </Typography>
          <FormControl>
            <RadioGroup
              value={competitiveMode}
              defaultValue={competitiveMode}
            >
              <FormControlLabel
                value="normal"
                label="Normal (Get 2 maps and choose 1)"
                control={<Radio onChange={handleOnChangeCompetitiveMode} />} 
              />
              <FormControlLabel
                value="same-map"
                label="Same map for all players"
                control={<Radio onChange={handleOnChangeCompetitiveMode} />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <Typography variant="h5" gutterBottom>
            Maps
          </Typography>
          <CheckboxTree
            id="select-advance-maps"
            rootLabel="All Advance Maps"
            items={advanceZooMapsArr}
            selectedValues={advanceZooMaps}
            onChange={handleOnChangeAdvanceZooMaps}
          />
          {/* <CheckboxTree
            id="select-advance-maps"
            rootLabel="Beginner Maps"
            items={beginnerZooMapsArr}
            selectedValues={beginnerZooMaps}
            onChange={handleOnChangeBeginnerZooMaps}
          /> */}
        </Grid>
        <Grid item xs={12} md={12} xl={12}>
          <Button
            variant="contained"
            size="large"
            onClick={handleRandomize}
          >
            Start Randomize
          </Button>
        </Grid>
      </Grid>

      <Grid container id="result-container">

      </Grid>
    </SettingsContext.Provider>
  )
}
