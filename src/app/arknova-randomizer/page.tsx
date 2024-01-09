'use client'

import React, { useState, useMemo } from 'react'
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
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'
import MultipleSelectToggleButton from './components/multiple-select-toggle-button'
import {
  allWorkerColors,
  SettingsType,
  defaultSettings,
  WorkerColor,
  ZooMap,
  // beginnerZooMapsArr,
  advanceZooMapsArr,
  CompetitiveMode,
  RandomizeResults,
} from './types-consts'
import { SettingsContext } from './settings-context'
import CheckboxTree from './components/checkbox-tree'
import { getRandomizeResults, validateSettingsData } from './helpers'
import WorkerIcon from './components/worker-icon'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ArkNovaRandomizer() {
  const initResults: RandomizeResults = {
    playerMaps: [],
    draftActionCards: [],
    actionOrder: [],
    firstPlayer: undefined,
    conservationProjects: [],
  }
  const [results, setResults] = useState<RandomizeResults>(initResults)

  const [settings, setSettings] = useState<SettingsType>(defaultSettings)

  const [openResultDialog, setOpenResultDialog] = useState<boolean>(false)

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

  const validationResults = validateSettingsData(settings)

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
        competitiveMode: event.target.value as CompetitiveMode,
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
    setOpenResultDialog(true)
    const randomizeResults = getRandomizeResults(settings)
    setResults(randomizeResults)

    console.log(randomizeResults)
  }

  const handleCloseResultDialog = () => {
    setOpenResultDialog(false)
    setResults(initResults)
  }

  const contextValue = useMemo(() => ({ settings, setSettings }), [settings, setSettings])

  return (
    <SettingsContext.Provider value={contextValue}>
      <Typography variant="h4" id="arknova-randomizer-title" gutterBottom>
        ArkNova Randomizer
      </Typography>

      <Grid container id="setup-container">
        <Grid item xs={12} md={12}>
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
        <Grid item xs={12} md={4}>
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
            {/* <FormControlLabel
              label="New bonus tiles"
              control={<Checkbox checked={newBonusTiles} onChange={handleOnChangeNewBonusTiles} />}
            /> */}
          </FormGroup>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Competitive Mode
          </Typography>
          <FormControl>
            <RadioGroup
              value={competitiveMode}
              defaultValue={competitiveMode}
            >
              <FormControlLabel
                value={CompetitiveMode.NORMAL}
                label="Normal (Get 2 maps and choose 1)"
                control={<Radio onChange={handleOnChangeCompetitiveMode} />} 
              />
              <FormControlLabel
                value={CompetitiveMode.SAME_MAP}
                label="Same map for all players"
                control={<Radio onChange={handleOnChangeCompetitiveMode} />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={12} style={{ border: 'none' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleRandomize}
            disabled={!validationResults.isValid}
          >
            Start Randomize
          </Button>
          {!validationResults.isValid && (
            <Typography variant="body2" style={{ color: '#F93', marginTop: '10px' }}>{
              validationResults.message}
            </Typography>)}
        </Grid>
      </Grid>

      <Dialog
        fullScreen
        open={openResultDialog}
        onClose={handleCloseResultDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              ArkNova Randomizer - Results
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseResultDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '20px' }}>
          <Typography variant='h6' style={{ marginBottom: '12px' }}>
            Player Map
          </Typography>
          {results?.playerMaps?.map((mapResult) => (
            <>
              <Typography variant="body1" style={{ marginBottom: '8px' }}>
                <WorkerIcon
                  color={mapResult.player}
                  size='small'
                  style={{ display: 'inline-block', verticalAlign: 'bottom' }}
                />
                <span style={{ textTransform: 'capitalize', fontWeight: 700, marginLeft: '8px' }}>{mapResult.player}</span>
              </Typography>
              {mapResult.maps.map((m, index) => (<Typography key={`player_map_${index}`} variant="body1">- {m}</Typography>))}
              <br />
            </>
          ))}
          <br />
          <hr />
          <br />

          {results?.draftActionCards.length > 0 && (
          <>
            <Typography variant='h6' style={{ marginBottom: '12px' }}>
              Draft Action Cards
            </Typography>
            {results?.draftActionCards?.map((result) => (
              <>
                <Typography variant="body1" style={{ marginBottom: '8px' }}>
                  <WorkerIcon
                    color={result.player}
                    size='small'
                    style={{ display: 'inline-block', verticalAlign: 'bottom' }}
                  />
                  <span style={{ textTransform: 'capitalize', fontWeight: 700, marginLeft: '8px' }}>{result.player}</span>
                </Typography>
                {result.actionCards.map((c, index) => (<Typography key={`draft_action_cards_${index}`} variant="body1">- {c}</Typography>))}
                <br />
              </>
            ))}
            <br />
            <hr />
            <br />
          </>
          )}

          <Typography variant='h6' style={{ marginBottom: '12px' }}>
            Action Card Order
          </Typography>
          {results?.actionOrder?.map((result) => (
            <>
              <Typography variant="body1" style={{ marginBottom: '8px' }}>
                <WorkerIcon
                  color={result.player}
                  size='small'
                  style={{ display: 'inline-block', verticalAlign: 'bottom' }}
                />
                <span style={{ textTransform: 'capitalize', fontWeight: 700, marginLeft: '8px' }}>{result.player}</span>
              </Typography>
              <Typography variant="body1">1 - Animal</Typography>
              {result.actionOrder.map((o, index) => (<Typography key={`action_card_order_${index}`} variant="body1">{index+2} - {o}</Typography>))}
              <br />
            </>
          ))}
          <br />
          <hr />
          <br />

          <Typography variant='h6' style={{ marginBottom: '12px' }}>
            First Player
          </Typography>
          <Typography variant='body1' style={{ marginBottom: '8px' }}>
            <WorkerIcon
                  color={results.firstPlayer}
                  size='small'
                  style={{ display: 'inline-block', verticalAlign: 'bottom' }}
                />
                <span style={{ textTransform: 'capitalize', fontWeight: 700, marginLeft: '8px' }}>{results.firstPlayer}</span> will be the First player
          </Typography>
          <br />
          <hr />
          <br />

          <Typography variant='h6' style={{ marginBottom: '12px' }}>
            Conservation projects
          </Typography>
          {results?.conservationProjects.map((cp, index) => (<Typography key={`conservation_project_${index}`} variant="body1">- {cp}</Typography>))}
          <br />
          <br />
          <br />
        </div>
      </Dialog>
    </SettingsContext.Provider>
  )
}
