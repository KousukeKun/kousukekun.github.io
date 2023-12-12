import Box from '@mui/material/Box'
import { LayoutProps } from '@/app/types'
import './styles.css'


export default function ArkNovaRandomizerLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  return (
    <Box id="arknova-randomizer-layout">
      {children}
    </Box>
  )
}
