import * as React from 'react';
import { SafeAreaView, View,TouchableOpacity,Text, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { GLOBAL } from '../../styles/global';
import { CTEXT } from '../../elements/custom';
import tw from 'twrnc'
import { Navigation } from 'react-native-navigation';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
export interface Props {}
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  iosClientId: '483206680440-i16eksagcprj0s9eqp3hqtr4th1u0av8.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: '/Users/diego/Documents/Projects/knowledge_system/react-native-typescript-boilerplate/src/view/assets/GoogleService-Info.plist', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
const SignUp: React.FC<Props> = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword,setConfirmPassword] = React.useState('');
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  async function signIn(){
    var body = {
      email: email,
      password: password
    }
    var res = await fetch("http://localhost:8000/token",{
      method: 'POST',
      body: JSON.stringify(body),
    })
    var data = await res.json()
  }
  async function isSignedIn(){
    var res = await GoogleSignin.isSignedIn()
    if(res){
      await getCurrentUser()
    }
    return res
  }
  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log(currentUser)
  };
  async function navigateToSignIn(){
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
  async function signUp(){
    if(password == confirmPassword){
    var body = {
      email: email,
      password: password,
    }
    var res = await fetch("http://localhost:8000/user",{
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
    })
    var data = await res.json()
  }
  else{
    alert("Passwords do not match")
  }
  }
  return (
    <SafeAreaView style={GLOBAL.LAYOUT.SafeArea}>
      <View style={GLOBAL.LAYOUT.pageContainer}>
        <Text onPress={isSignedIn}>Test</Text>
        <View style={tw`rounded mt-36 justify-center items-center p-8 shadow-lg bg-white`}>
          <Text style={tw`text-left w-full block text-sm font-medium text-gray-700`}>Email Address</Text>
          {/* <Text style={styles.container}>Test Hello</Text> */}
        <TextInput
      autoCorrect={false}
      textContentType={'emailAddress'}
      style={tw.style(`mb-4 h-10 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-fountain-blue-500 focus:outline-none focus:ring-fountain-blue-500 sm:text-sm`)}

      // style={tw`text-left h-12 text-xl border rounded pl-1 w-full mb-4`}
        onChangeText={setEmail}
        value={email}
        placeholder={'Email'}
      />
    <Text style={tw`text-left w-full block text-sm font-medium text-gray-700`}>Password</Text>
      <TextInput
      textContentType={'password'}
      secureTextEntry={true}
        style={tw.style(`mb-4 h-10 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-fountain-blue-500 focus:outline-none focus:ring-fountain-blue-500 sm:text-sm`)}
        onChangeText={setPassword}
        value={password}
        placeholder={'Password'}
      />
      <Text style={tw`text-left w-full block text-sm font-medium text-gray-700`}>Confirm Password</Text>
      <TextInput
      textContentType={'password'}
      secureTextEntry={true}
        style={tw.style(`h-10 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-fountain-blue-500 focus:outline-none focus:ring-fountain-blue-500 sm:text-sm`)}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder={'Password'}
      />
      <TouchableOpacity onPress={signUp} style={tw`w-full rounded-xl bg-blue-500 mt-2 text-center`}>
        <Text style={tw`text-center py-3 text-white font-semibold`}>Sign up</Text>
        </TouchableOpacity>
        <Text style={tw`mt-3`} onPress={navigateToSignIn}>Already have an account? Sign in now</Text>
        </View>
        <View style={tw`relative mt-4`}>
          {/* <View style={tw`absolute inset-0 flex items-center`}> */}
            <View style={tw`w-full border-t border-gray-300`}></View>
          {/* </View> */}
          <View style={tw`relative flex justify-center text-sm`}>
            <Text style={tw`bg-white px-2 mt-2 text-gray-500 text-center text-lg`}>Or continue with</Text>
          </View>
          </View>
        {/* <View style={tw`relative flex justify-center text-sm `}>
          <View style={tw`w-full border-t border-gray-300 mt-2`}></View>
          <Text style={tw`bg-white px-2 text-gray-500 text-center`}>Or continue with</Text>
        </View> */}
        <GoogleSigninButton
        size={1}
        onPress={googleSignIn}
        style={tw.style({ width: 240, height: 60 },'mx-auto w-full rounded')}
        >

        </GoogleSigninButton>
        {/* <GoogleSigninButton
        
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {}}
        disabled={()=>{}}
      /> */}
        {/* <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>
            React Native Box Shadow (Shadow Props)
          </Text>
        </View>
        <View >
          
        </View>
        <Text>
          Using the elevation style prop to apply box-shadow for iOS devices
        </Text>
      </View> */}
      {/* <TextInput
       style={tw`text-center`}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}
      </View>
    </SafeAreaView>
  );
}

export default SignUp;



const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
    // width: '100%',
    // marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
// const styles = StyleSheet.create({
//   // container: {
//   //   fontFamily:"sf-ui-display",
//   //   // flex: 1,
//   //   // justifyContent: "center",
//   //   // alignItems: "center",
//   //   // backgroundColor: "#F5FCFF"
//   // },
//   shadowProp: {
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
// });