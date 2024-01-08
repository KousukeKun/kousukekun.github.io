'use client'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import WorkerIcon from './worker-icon'
import { WorkerColor } from '../types-consts'

export type MultipleSelectToggleButtonProps = {
  id: string
  items: string[]
  selectedValues: string[]
  onChange?: (event: React.MouseEvent<HTMLElement>, newValues: string[]) => void
}

export default function MultipleSelectToggleButton(props: Readonly<MultipleSelectToggleButtonProps>) {
  const { id, items, selectedValues, onChange } = props

  return (
    <ToggleButtonGroup
      id={id}
      color='primary'
      value={selectedValues}
      onChange={onChange}
    >
      {items?.map((item) => (
        <ToggleButton
          key={`${id}-item-${item}`}
          value={item}
        >
          <WorkerIcon
            color={item as WorkerColor}
            size='small'
          />
          {item}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
