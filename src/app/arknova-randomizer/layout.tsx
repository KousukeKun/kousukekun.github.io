import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import { LayoutProps } from '@/app/types'
import './styles.css'

export const metadata: Metadata = {
  title: 'ArkNova Randomizer',
  description: 'ArkNova Randomizer',
}

export default function ArkNovaRandomizerLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  return (
    <Box id="arknova-randomizer-layout">
      {children}
    </Box>
  )
}
