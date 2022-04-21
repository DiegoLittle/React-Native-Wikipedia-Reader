import * as React from 'react';
import { SafeAreaView, View,TouchableOpacity,Text } from 'react-native';

import { GLOBAL } from '../../styles/global';
import { CTEXT } from '../../elements/custom';
import tw from 'twrnc'
import { Navigation } from 'react-native-navigation';
import router from '../../../navigators/router';
import { useDeviceContext, useAppColorScheme } from 'twrnc';
import { Appearance } from 'react-native';


export interface Props {}

const SETTINGS: React.FC<Props> = (props: Props) => {

  // const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  function SignIn(){
    Navigation.push(props.componentId, {
      component: {
        name: 'SignIn',
        options: {
          topBar: {
            title: {
              text: 'Sign In',
            },
          },
        },
      },
    });
  }

  return(
    <SafeAreaView style={GLOBAL.LAYOUT.SafeArea}>
      <View style={GLOBAL.LAYOUT.pageContainer}>
        <TouchableOpacity onPress={SignIn} style={tw`flex rounded bg-blue-300 w-auto`}>
          <Text style={tw`text-lg`}>Sign in to sync</Text>
        </TouchableOpacity>
        <CTEXT>{'Settings'}</CTEXT>
        {/* <TouchableOpacity onPress={toggleColorScheme}>
      <Text style={tw`text-black dark:text-white`}>Switch Color Scheme</Text>
    </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

export default SETTINGS;
