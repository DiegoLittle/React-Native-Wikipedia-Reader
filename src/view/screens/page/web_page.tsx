import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { SafeAreaView, ScrollView, TouchableOpacity, Image, View } from 'react-native';

import { GLOBAL } from '../../styles/global';
import { Category } from '../../widgets/category';
import locale from '../../../constants/locale';
import router from '../../../navigators/router';
import { BUTTON_DEFAULT } from '../../elements/buttons';
import { CTEXT, CTEXTINPUT } from '../../elements/custom';
import { WebView } from 'react-native-webview';
import { Icon } from 'react-native-elements'
import tw from 'twrnc'
import { Props } from '../home/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface State {
  name: string;
}

const WebPage = (props) => {
  const [pageSaved, setPageSaved] = useState(false)
  const bookmarks = useSelector(state => state.app.bookmarks)
  const [title,setTitle] = useState('')
  const dispatch = useDispatch()

  function included(bookmarks, bookmark_title) {
    for (let i = 0; i < bookmarks.length; i++) {
      console.log(bookmarks[i].title)
      if (bookmarks[i].title === bookmark_title) {
        console.log('found')
        return true;
      }
    }
    return false;
  }
  var url = props.url.replace("http://", "https://");
  function showPushScreen(){
    router.showPushScreen({
      componentId: props.componentId,
      passProps: {
        dummyText: 'Hello from Home !!!',
      },
    });
  }
  return (
    <View style={GLOBAL.LAYOUT.SafeArea}>
            <WebView
      originWhitelist={["*"]}
      onShouldStartLoadWithRequest={(request) => {
        // Only allow navigating within this website
        console.log(request)
        return true
        // return request.url.startsWith('https://reactnative.dev');
      }}
      source={{ uri: url }}
      // style={{ marginTop: 20 }}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        if(nativeEvent.domain=="NSURLErrorDomain"){
          Navigation.pop(props.componentId);
        }
        console.log(nativeEvent.description)
        console.warn('WebView error: ', nativeEvent);
      }}
      onLoad={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        setTitle(nativeEvent.title)
        if(included(bookmarks,nativeEvent.title)){
          setPageSaved(true)
        }
      }}
    />
    <View style={tw`flex-row h-12 w-full justify-between px-12 pt-2`}>
        {/* <Icon
        onPress={showBurgerMenu}
        // containerStyle={tw`w-1/3`}
        // iconStyle={tw`flex`}
        name="menu"
        size={36}
        ></Icon> */}
        <Icon></Icon>
        {pageSaved ? <Icon
          // className={tw`bg`}
          onPress={() => {
            dispatch({ type: 'bookmarks/remove_by_title', payload: title })
            setPageSaved(false)
          }}
          name="bookmark"
          size={36}
          iconStyle={tw`my-auto`}
          // containerStyle={tw`w-1/3`}
        ></Icon> : <Icon
          // className={tw`bg`}
          onPress={() => {
            // dispatch({type:"test"})
            console.log()
            var bookmark = {
              title: title,
              url: url,
              isSynced: false,
              isWebView: true
            }
            dispatch({ type: 'bookmarks/add_webview', payload: bookmark })
            setPageSaved(true)
          }}
          name="bookmark-outline"
          size={36}
          iconStyle={tw`my-auto`}
        ></Icon>
        }
        <Icon
        // name="share"
        >

        </Icon>

      </View>
    </View>
  );
}

export default WebPage