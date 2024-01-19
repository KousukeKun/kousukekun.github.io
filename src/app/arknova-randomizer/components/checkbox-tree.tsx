'use client'

import { FormControlLabel, Checkbox, Box } from '@mui/material'
import { uniq } from 'lodash'

export type CheckboxTreeProps = {
  id: string
  rootLabel: string
  items: string[]
  selectedValues: string[]
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, newValues: string[]) => void
}

export default function CheckboxTree(props: Readonly<CheckboxTreeProps>) {
  const { id, items, rootLabel, selectedValues, onChange } = props

  const handleOnChangeRootCheckbox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (onChange) {
      const updatedValues = checked ? items : []
      onChange(event, updatedValues)
    }
  }

  const handleOnChangeLeafCheckbox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (onChange) {
      const updatedValues = checked
        ? uniq([...selectedValues, event.target.value])
        : selectedValues.filter((value) => value !== event.target.value)
      onChange(event, updatedValues)
    }
  }

  return (
    <div id={id}>
      <FormControlLabel
        label={rootLabel}
        control={
          <Checkbox
            checked={selectedValues.length === items.length}
            onChange={handleOnChangeRootCheckbox}
          />
        }
      />
      {items && (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          {items.map((item) => (
            <FormControlLabel
              key={`${id}-item-${item}`}
              label={item}
              control={
                <Checkbox
                  value={item}
                  checked={selectedValues.includes(item)}
                  onChange={handleOnChangeLeafCheckbox}
                />
              }
            />
          ))}
        </Box>
      )}
    </div>
  )
}
