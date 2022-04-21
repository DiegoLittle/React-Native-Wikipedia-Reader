import { Navigation } from 'react-native-navigation';

import store from '../../shared/redux/store';
import { registerScreens } from '../view/screens';
import tabbedNavigation, { showBookmarks, showSplash } from './navigation';
import topBarButton from './topBarButton'
import { useDeviceContext } from 'twrnc';
import tw from 'twrnc'
import {Share,Test} from './share_menu'
import { AppRegistry, Text, View, Image, Button } from "react-native";

// import { RNNSearchBar } from "react-native-navigation-search-bar";

/**
 * Register screens and components for react native navigation
 */
registerScreens( store );

/**
 * Entry point for the app
 * showSplash() -> As the name suggests, shows the splash screen.
 *                 If you do not want a splash screen, directly call `tabbedNavigation()`
 *                 defined in './navigation'
 */
const app = () => {
  
  AppRegistry.registerComponent("Test", () => Test);
  AppRegistry.registerComponent("ShareMenuModuleComponent", () => Share);
  Navigation.events().registerAppLaunchedListener(() => {
    
    Navigation.setDefaultOptions({
      /**
       * Add default options right here
       */
      topBar: { 
        visible: true,
        //  elevation: 0,
         rightButtons: [
          {
            id: '1',
            component: {
              name: 'ButtonComponent',
              passProps: {
                text: 'Bookmarks',
                // Pass initial props to the button here
              },
            },
          },
        ]
       },
    });
    Navigation.registerComponent('search', () => RNNSearchBar );
    Navigation.registerComponent('ButtonComponent', () => topBarButton);
    // showSplash();
    // showBookmarks()
    tabbedNavigation()
  });
};

export default app;
