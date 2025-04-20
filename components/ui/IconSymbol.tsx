// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather'
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle, TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'back': 'chevron-left',
  "add": "add",
  "calendar": "calendar-today",
  "close": "close",
  "checkmark": "check",
  "edit": "edit",
  "delete": "delete",
  "save": "save",
  "notification": "notifications",
  "user":"person",
  "support": "support-agent",
  "exit": "logout",
  "eye": "visibility",
  "eye.slash": "visibility-off",
  "humidity": "droplet",
  "temperature": "ac-unit",
  "wind": "air",
} as const;
  // } as Partial<
//   Record<
//     import('expo-symbols').SymbolViewProps['name'],
//     React.ComponentProps<typeof MaterialIcons>['name']
//   >
// > ;

export type IconSymbolName = keyof typeof MAPPING ;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  className,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  // style?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  className?: string,
  weight?: SymbolWeight;
}) {
  if (name === 'humidity') {
    return <Feather name="droplet" size={size} color={color} style={style} className={className}/>;
  }

  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} className={className}/>;
}
