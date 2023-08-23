import { memo } from 'react'
import { FlatList, View } from 'react-native'
import { Label } from './Label'

interface ISwipeList {
  numbers: number[]
  label: string
}

export const SwipeList = memo(({ numbers, label }: ISwipeList) => {
  return (
    <View>
      <FlatList
        data={numbers}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => <Label>{item}</Label>}
        style={{ height: 60, width: 80 }}
      />
    </View>
  )
})
