/**
 * Application navigation stacks to be defined here.
 */
import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../constants/screen';
import { TYPOGRAPHY } from '../view/styles/typography';
import { useDeviceContext } from 'twrnc';
import tw from 'twrnc'
import { Appearance } from 'react-native';

export const STATUS_BAR_OPTIONS = {
  hideWithTopBar: true,
  backgroundColor: TYPOGRAPHY.COLOR.StatusBar,
};

export const showSplash = () => {
  Navigation.setRoot({
    root: {
      component: { name: SCREENS.Splash },
    },
  });
};
export const showBookmarks = () => {
  Navigation.setRoot({
    root: {
      component: { name: SCREENS.Bookmarks },
    },
  });
};
const colorScheme = Appearance.getColorScheme()
if (colorScheme === 'dark') {
  var icon_color = 'white'
}
else{
  var icon_color = 'black'
}
const selected_color = "blue"
export const tabbedNavigation = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: SCREENS.Drawer,
            id: 'drawerComponentId',
          },
        },
        center: {
          bottomTabs: {
            id: 'BottomTabsId',
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: SCREENS.Bookmarks,
                        passProps: {
                          text: 'This is Bookmarks',
                        },
                      },
                    },
                  ],
                  options: {
                    topBar: {
                      visible: true,
                      drawBehind: true,
                      animate: true,
                    },
                    bottomTab: {
                      fontSize: 14,
                      // text: 'Bookmarks',
                      textColor: icon_color,
                      // selectedTextColor: TYPOGRAPHY.COLOR.Warning,
                      // style:{marginTop:4},
                      selectedIconColor: selected_color,
                      icon: require('../view/assets/images/tabbar/bookmarks.png'),
                      selectedIcon: require('../view/assets/images/tabbar/bookmarks.png'),
                    },
                  },
                },
              },
              // {
              //   stack: {
              //     children: [
              //       {
              //         component: {
              //           name: SCREENS.Home,
              //           passProps: {
              //             text: 'This is Home',
              //           },
              //         },
              //       },
              //     ],
              //     options: {
              //       topBar: {
              //         visible: false,
              //         drawBehind: true,
              //         animate: true,
              //       },
              //       bottomTab: {
              //         fontSize: 14,
              //         text: 'Home',
              //         textColor: TYPOGRAPHY.COLOR.Primary,
              //         selectedTextColor: TYPOGRAPHY.COLOR.Warning,
              //         selectedIconColor: TYPOGRAPHY.COLOR.Warning,
              //         icon: require('../view/assets/images/tabbar/home.png'),
              //         selectedIcon: require('../view/assets/images/tabbar/home.png'),
              //       },
              //     },
              //   },
              // },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: SCREENS.Settings,
                      },
                    },
                  ],
                  options: {
                    topBar: {
                      visible: false,
                      drawBehind: true,
                      animate: true,
                    },
                    bottomTab: {
                      text: 'Settings',
                      fontSize: 14,
                      textColor: TYPOGRAPHY.COLOR.Primary,
                      selectedTextColor: TYPOGRAPHY.COLOR.Warning,
                      selectedIconColor: TYPOGRAPHY.COLOR.Warning,
                      icon: require('../view/assets/images/tabbar/settings.png'),
                      selectedIcon: require('../view/assets/images/tabbar/settings.png'),
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });

export default tabbedNavigation;
