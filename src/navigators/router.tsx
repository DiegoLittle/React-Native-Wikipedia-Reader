/**
 * Defined application routes over here
 * Good place to define some commonly used methods like
 *          `popToScreen`, `dismissModal`...
 */
import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../constants/screen';
import { STATUS_BAR_OPTIONS } from './navigation';
import { INavigation } from '../../shared/redux/types/INavigation';

/**
 * Router method to show a screen by pushing on top of current stack
 * @param {object} params i.e {componentId is compulsory, passProps is optional},
 */
const showPushScreen = ({ componentId, passProps = {} }: INavigation) => {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.Dummy,
      id: SCREENS.Dummy,
      passProps: {
        ...passProps,
      },
      options: {
        topBar: {
          visible: true,
        },
      },
    },
  });
};
const showSignInScreen = ({ componentId, passProps = {} }: INavigation) => {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.SignIn,
      id: SCREENS.SignIn,
      passProps: {
        ...passProps,
      },
      options: {
        topBar: {
          visible: true,
        },
      },
    },
  });
};
const showSearchScreen = ({ componentId, passProps = {} }: INavigation) => {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.Search,
      id: SCREENS.Search,
      passProps: {
        ...passProps,
      },
      options: {
        topBar: {
          visible: true,
        },
      },
    },
  });
};
const showPageScreen = ({ componentId, passProps = {} }: INavigation) => {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.Page,
      id: SCREENS.Page,
      passProps: {
        ...passProps,
      },
      options: {
        topBar: {
          visible: true,
        },
        bottomTabs:{
          visible: false,
        }
      },
    },
  });
};
const showWebPage = ({ componentId, passProps = {} }: INavigation) => {
  Navigation.push(componentId, {
    component: {
      name: SCREENS.WebPage,
      id: SCREENS.WebPage,
      passProps: {
        ...passProps,
      },
      options: {
        topBar: {
          visible: true,
        },
        bottomTabs:{
          visible: false,
        }
      },
    },
  });
};
/**
 * Router method to show a screen by pushing on top of current stack
 * @param {object} params i.e {componentId is compulsory, passProps is optional},
 */
const push = ({ componentId, passProps = {} }: INavigation, id: string, title?: string) => {
  Navigation.push(componentId, {
    component: {
      name: id,
      passProps: {
        ...passProps,
      },
      options: {
        statusBar: STATUS_BAR_OPTIONS,
        topBar: {
          visible: true,
          drawBehind: false,
          title: {
            text: title || id.toString(),
          },
        },
      },
    },
  });
};

function pushPage(title:string){
  Navigation.push('Page',{
    component: {
      name: 'Page',
      passProps: {
        title: title
      },
      options: {
        // statusBar: STATUS_BAR_OPTIONS,
        topBar: {
          visible: true,
          drawBehind: false,
          // title: {
          //   text: title || id.toString(),
          // },
        },
        bottomTabs:{
          visible: false,
        }
      },
    }
  })
}

const showListingsScreen = ({ componentId, passProps = {} }: INavigation, title?: string) => {
  push({ componentId, passProps }, SCREENS.Dummy, title);
};

const popToScreen = ({ componentId }: INavigation) => {
  Navigation.popTo(componentId);
};

const dismissModal = ({ componentId }: INavigation) => {
  Navigation.dismissModal(componentId);
};

const pop = ({ componentId }: INavigation) => Navigation.pop(componentId);

const popToRoot = ({ componentId }: INavigation) => Navigation.popToRoot(componentId);

const ROUTER = {
  showPushScreen,
  popToScreen,
  dismissModal,
  pop,
  push,
  popToRoot,
  showListingsScreen,
  showSearchScreen,
  showPageScreen,
  pushPage,
  showSignInScreen,
  showWebPage
};

export default ROUTER;
