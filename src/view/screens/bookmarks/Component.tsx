import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { SafeAreaView, ScrollView, TouchableOpacity, Image,Text } from 'react-native';

import { GLOBAL } from '../../styles/global';
import { Category } from '../../widgets/category';
import locale from '../../../constants/locale';
import router from '../../../navigators/router';
import { BUTTON_DEFAULT } from '../../elements/buttons';
import { CTEXT, CTEXTINPUT } from '../../elements/custom';
import Bookmark from '../../widgets/bookmark'
import tw, { useDeviceContext } from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';

import { Props } from './index';

interface State {
  name: string;
}

// class Home extends React.PureComponent<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     Navigation.events().bindComponent(this);
//     this.state = {
//       name: props.name || 'Redux + TypeScript + React Native Navigation',
//     };
//   }

//   // componentDidMount() {}





//   // myarray = ["StarSpace: Embed All The Things!", "Redux Persist", "3", "4", "5", "6", "7", "8", "9", "10"];

//   // render() {
//   //   const { name } = this.state;
//   //   const { componentId } = this.props;


//   // }
// }

// export default Home;

const Home = (props: Props) => {
  const dispatch = useDispatch()
  useDeviceContext(tw);
  const bookmarks = useSelector(state => state.app.bookmarks)
  const user = useSelector(state => state.app.user)
  React.useEffect(() => {
    
    // console.log(bookmarks[0])
    // async function syncBookmarks(){
    var unsynced_bookmarks = bookmarks.filter(bookmark => bookmark.isSynced == false)
    // console.log(bookmarks)
    unsynced_bookmarks.forEach(async (bookmark) => {
      console.log(bookmark)
      var body = {
        bookmark: bookmark.title,
        access_token: user.access_token
      }
      // await fetch("http://localhost:8000/user/bookmarks", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(body),
      // })
      for (let index = 0; index < bookmarks.length; index++) {
        const element = bookmarks[index];
        if (element.title == bookmark.title){
          bookmarks[index].isSynced = true
          dispatch({type:"bookmarks/set", payload: bookmarks})
        }
        
      }
    })
    // }
  },[])
  function showBurgerMenu() {
    Navigation.mergeOptions('drawerComponentId', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  }
  function showPushScreen(item) {
    const { componentId } = props;
    
    if(item.isWebView){
      router.showWebPage({
        componentId: componentId,
        passProps: {
          url: item.url,
          title: item.title,
        },
      });
    }
    else{
      router.showPageScreen({
        componentId,
        passProps: {
          title: item.title,
        },
      });
    }
  }
  return (
    <SafeAreaView style={GLOBAL.LAYOUT.SafeArea}>
      <ScrollView style={tw`dark:bg-black`}>
        {bookmarks.reverse().map((item, index) => <Bookmark onClick={() => { showPushScreen(item) }} bookmark={item} key={index}></Bookmark>)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home