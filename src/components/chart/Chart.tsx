import { Font } from 'assets'
import { Label } from 'components/Label'
import { t } from 'i18next'
import _ from 'lodash'
import moment from 'moment'
import React, { memo, useEffect, useMemo, useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  PlatformIOSStatic,
} from 'react-native'
import { Colors } from 'theme'
import { nFormatter } from 'utils/helper'

export const Chart = memo(({ data, type }: { data: any; type: number }) => {
  const [width, setWidth] = useState(40)

  const numArray = data?.map((item: any) => item.amount)

  const max = Math.max(...numArray)
  const oneOfFith = max / 5

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const platformIOS = Platform as PlatformIOSStatic
      if (platformIOS.isPad) {
        setWidth(80)
      }
    }
  }, [])

  const labels = useMemo(() => {
    const _labels = _.range(1, 6).map(item => item * oneOfFith)

    return data?.length > 0 ? (
      <View
        style={{
          justifyContent: 'space-between',
          height: 100,
          minWidth: 30,
          marginTop: 20,
          position: 'relative',
        }}
      >
        {_labels
          .filter((item: any, index: number) => _labels.indexOf(item) === index)
          .sort((a: number, b: number) => b - a)
          .map((item: any, index: number) => {
            let height = 10
            const platformIOS = Platform as PlatformIOSStatic
            if (platformIOS.isPad) {
              height = item > 0 ? 370 - (item / max) * 380 : 10
            } else {
              height = item > 0 ? 190 - (item / max) * 200 : 10
            }
            return (
              <Label
                key={`${index}`}
                text={nFormatter(item, 2)}
                numberOfLines={1}
                style={{
                  fontFamily: Font.poppinsMedium,
                  fontSize: Platform.isPad ? 18 : 13,
                  position: 'absolute',
                  top: height,
                  minWidth: 50,
                }}
              />
            )
          })}
      </View>
    ) : null
  }, [data])

  const [focus, setFocus] = useState(0)

  return data?.length > 0 ? (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => `${index}`}
      extraData={type}
      style={{ paddingVertical: 20, marginTop: 20 }}
      contentContainerStyle={{ paddingBottom: 200 }}
      ListHeaderComponent={() => (
        <>
          <View>{labels}</View>
          <Label
            text={'0'}
            style={{
              position: 'absolute',
              bottom: 0,
              fontFamily: Font.poppinsMedium,
              fontSize: Platform.isPad ? 18 : 13,
            }}
          />
        </>
      )}
      renderItem={({ item, index }: { item: any; index: number }) => {
        let height = 10
        const platformIOS = Platform as PlatformIOSStatic
        if (platformIOS.isPad) {
          height = item.amount > 0 ? (item.amount / max) * 380 : 10
        } else {
          height = item.amount > 0 ? (item.amount / max) * 200 : 10
        }
        return (
          <TouchableOpacity
            onPress={() => setFocus(index)}
            style={{
              width,
              height,
              backgroundColor:
                index === focus ? Colors.RoamieGreen : Colors.RoamieBegie,
              marginLeft: 20,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              alignSelf: 'flex-end',
              marginTop: 20,
            }}
          >
            {index === focus ? (
              <>
                <Label
                  text={`${nFormatter(item.amount, 2)}`}
                  style={{
                    alignSelf: 'center',
                    marginTop: -20,
                    fontFamily: Font.poppinsMedium,
                    fontSize: Platform.isPad ? 18 : 13,
                  }}
                />
              </>
            ) : null}
            <Label
              text={t(moment(item.date_mobile).format('ddd'))}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: -25,
                fontFamily: Font.poppinsMedium,
                fontSize: Platform.isPad ? 18 : 13,
              }}
            />
          </TouchableOpacity>
        )
      }}
    />
  ) : null
})
