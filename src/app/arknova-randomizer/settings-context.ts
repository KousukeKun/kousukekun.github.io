import {
  createContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { SettingsType, defaultSettings } from './types-consts'

type SettingContextType = {
  settings: SettingsType,
  setSettings: Dispatch<SetStateAction<SettingsType>>,
}

export const SettingsContext = createContext({
  settings: defaultSettings,
  setSettings: () => {},
} as unknown as SettingContextType)
