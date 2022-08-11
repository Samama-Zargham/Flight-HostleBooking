{/* <View style={{
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
}}>
  <GooglePlacesAutocomplete
    styles={{
      poweredContainer: { display: 'none' },
      textInput: {
        color: "gray",
        backgroundColor: colors.lightGray,
        borderColor: colors.primary,
        paddingTop:7,
        height: 55,
        borderRadius: 5,
      }
    }}
    renderRightButton={() =>
      <Image
        style={[styles.iconStyle, { width: 15, height: 15, marginRight: 15, alignSelf: "center" }]}
        source={iconPath.Location}
      />
    }
    placeholder="Location here..."
    query={{
      key: 'AIzaSyDt9GY0qjMwSFvi-ODbrRJFZg3wCwtZofc',
      language: 'en', // language of the results
    }}
    onPress={(data) => {
      console.log(data)

      console.log(data.structured_formatting.main_text)
      // setCityAirport(data.structured_formatting.main_text)

    }
    }
    onFail={(error) => console.error(error)}
  />
</View> */}
import { View, Text } from 'react-native'
import React from 'react'

const nothing = () => {
  return (
    <View>
      <Text>nothing</Text>
    </View>
  )
}

export default nothing