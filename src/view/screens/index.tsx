import * as React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../../constants/screen';

import * as Splash from './splash';
import * as Home from './home';
import * as Settings from './settings';
import * as Drawer from './drawer';
import * as Dummy from './dummy';
import * as Bookmarks from './bookmarks'
import * as Search from './search'
import * as Page from './page';
import * as SignIn from './sign_in';
import * as SignUp from './sign_up'
import * as WebPage from './page/web_page'
import { useDeviceContext } from 'twrnc';
import tw from 'twrnc'


const registerComponentWithRedux = (redux: any) => (
  name: string,
  screen: any,
) => {
  
  Navigation.registerComponent(
    name,
    () => (props: any) => (
      <Provider store={redux.store}>
        <screen.default {...props} />
      </Provider>
    ),
    () => screen.default);
};

export function registerScreens(redux: any) {
  // AppRegistry.registerComponent("Test", () => Test);
  // AppRegistry.registerComponent("ShareMenuModuleComponent", () => Share);
  registerComponentWithRedux(redux)(SCREENS.Splash, Splash);
  registerComponentWithRedux(redux)(SCREENS.Home, Home);
  registerComponentWithRedux(redux)(SCREENS.Settings, Settings);
  registerComponentWithRedux(redux)(SCREENS.Drawer, Drawer);
  registerComponentWithRedux(redux)(SCREENS.Dummy, Dummy);
  registerComponentWithRedux(redux)(SCREENS.Bookmarks, Bookmarks);
  registerComponentWithRedux(redux)(SCREENS.Search, Search);
  registerComponentWithRedux(redux)(SCREENS.Page, Page);
  registerComponentWithRedux(redux)(SCREENS.SignIn, SignIn);
  registerComponentWithRedux(redux)(SCREENS.SignUp, SignUp);
  registerComponentWithRedux(redux)(SCREENS.WebPage, WebPage);

}
