'use client'

import { WorkerColor } from "../types"

export type WorkerIconProps = {
  color?: WorkerColor
  size?: 'small' | 'medium'
}

export default function WorkerIcon(props: Readonly<WorkerIconProps>) {
  const {
    color = WorkerColor.BLACK,
    size = 'medium',
  } = props

  return <div className={`worker-icon worker-icon-${size} worker-icon-${color}`} />
}
