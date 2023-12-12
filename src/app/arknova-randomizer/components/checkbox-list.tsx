'use client'

import React from 'react'
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material'

export type CheckboxListItem = {
  color: string
  label: string
  icon?: React.ReactNode
}

export type CheckboxListProps = {
  componentId: string
  items: CheckboxListItem[]
}

export default function CheckboxList(props: Readonly<CheckboxListProps>) {
  const { componentId, items } = props

  return (
    <List id={componentId}>
      {items?.map((item) => (
        <ListItem key={`${componentId}-item-${item.label}`}>
          <ListItemButton dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={false}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': `${componentId}-label-${item.label}` }}
              />
            </ListItemIcon>
            {item.icon && (
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText id={`${componentId}-label-${item.label}`} primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
