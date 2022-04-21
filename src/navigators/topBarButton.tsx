import React from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import router from './router'
import { Icon } from 'react-native-elements';
import { Appearance } from 'react-native';

type Props = {
    text: string
}

const TopBarButton = (props: Props) => {
  const colorScheme = Appearance.getColorScheme();
    console.log(props.text)
    var showPushScreen = (title:string) => {
      // const { componentId } = this.props;
      router.showSearchScreen({
        componentId:"Component2",
        passProps: {
          dummyText: title,
        },
      });
    }
  return (
    <TouchableOpacity onPress={()=>{
      showPushScreen("Hello")
      }}>
        {/* <Text>Test</Text> */}
        <Icon 
        color={colorScheme == 'dark' ? 'white' : 'black'}
        name="search"
        
        ></Icon>
    </TouchableOpacity>
  )
}

export default TopBarButton