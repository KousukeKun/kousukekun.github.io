'use client'

import {
  Typography,
  Grid,
} from '@mui/material'
import { useState } from 'react'
import MultipleSelectToggleButton from './components/multiple-select-toggle-button'
import { WorkerColor } from './types'

export default function ArkNovaRandomizer() {
  const allPlayers = [
    WorkerColor.BLUE,
    WorkerColor.YELLOW,
    WorkerColor.RED,
    WorkerColor.BLACK,
  ] as WorkerColor[]

  const [selectedPlayers, setSelectedPlayers] = useState<WorkerColor[]>(allPlayers)

  const handleOnChangePlayers = (event: React.MouseEvent<HTMLElement>, newValues: string[]) => {
    setSelectedPlayers(newValues as WorkerColor[])
  }

  return (
    <>
      <Typography variant="h4" id="arknova-randomizer-title" gutterBottom>
        ArkNova Randomizer
      </Typography>

      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Select Players
          </Typography>
          <MultipleSelectToggleButton
            id="select-players"
            items={allPlayers}
            selectedValues={selectedPlayers}
            onChange={handleOnChangePlayers}
          />
          <Typography variant="body2" gutterBottom>
            {selectedPlayers.length} players selected
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
