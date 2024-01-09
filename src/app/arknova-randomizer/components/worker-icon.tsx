'use client'

import { WorkerColor } from "../types-consts"

export type WorkerIconProps = {
  color?: WorkerColor
  size?: 'small' | 'medium'
  style?: React.CSSProperties
}

export default function WorkerIcon(props: Readonly<WorkerIconProps>) {
  const {
    color = WorkerColor.BLACK,
    size = 'medium',
    style = {},
  } = props

  return <div
    className={`worker-icon worker-icon-${size} worker-icon-${color}`}
    style={style}
  />
}
