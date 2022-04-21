/**
 * @author Luke Brandon Farrell
 * @description Search bar component for iOS and Android.
 */

/* NPM - Node Package Manage */
import React from "react";
import { Platform, Animated, StyleSheet, Appearance } from "react-native";
import PropTypes from "prop-types";
import { SearchBar as ElementsSearchBar } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { Icon } from 'react-native-elements'
import tw from 'twrnc'
export class RNNSearchBar extends React.Component {
  /**
   * [ Built-in React method. ]
   *
   * Executes when the component is initialized
   *
   * @param {object} props
   *
   */
  constructor(props) {
    super(props);

    /** Component State */
    this.state = {
      searchBarTopPadding: new Animated.Value(0),
      searchBarFocused: false
    };

    /** Component Bindings */
    this.searchBarFocused = this.searchBarFocused.bind(this);
    this.searchBarBlurred = this.searchBarBlurred.bind(this);
  }

  /**
   * [ Built-in React method. ]
   *
   * Allows us to render JSX to the screen
   */
  render() {
    /** Styles */
    const { searchContainerStyle } = styles;
    /** Props */
    const { search, placeholder, onSearchButtonPress, onCancel, onClear, onChangeText } = this.props;
    /** State */
    const { searchBarTopPadding } = this.state;
    const colorScheme = Appearance.getColorScheme();
    return (
      <Animated.View
      
        // style={[searchContainerStyle, { paddingTop: searchBarTopPadding }]}
      >
        <ElementsSearchBar
        searchIcon={<Icon 
          color={colorScheme == 'dark' ? 'white' : 'black'}
          name="search"></Icon>}
          value={search}
          platform={Platform.OS}
          // placeholder={placeholder}
          placeholder={'search'}
          placeholderTextColor={colorScheme == 'dark' ? 'white' : 'black'}
          // cancelIcon={{ type: "font-awesome", name: "chevron-left" }}
          inputContainerStyle={
            Platform.OS === "ios" ? tw`bg-gray-100 dark:bg-gray-800 ` : null
          }
          containerStyle={
            Platform.OS === "ios" ? tw`bg-white dark:bg-black` : null
          }
          inputStyle={tw`text-black dark:text-white`}
          // style={tw`bg-blue-500 `}
          lightTheme={false}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          // returnKeyType="search"
          onChangeText={value => onChangeText(value)}
          onBlur={this.searchBarBlurred}
          onFocus={this.searchBarFocused}
          onSubmitEditing={() => {
            if (onSearchButtonPress) onSearchButtonPress(search);
          }}
          onCancel={onCancel}
          onClear={onClear}
        />
      </Animated.View>
    );
  }
  
  /**
   * Sets the search as focused and evokes any side effects
   */
  searchBarFocused() {
    this.setState({ searchBarFocused: true });

    if (Platform.OS === "ios") {
      const { statusBarHeight } = this.props;

      Animated.timing(this.state.searchBarTopPadding, {
        useNativeDriver: true,
        toValue: statusBarHeight,
        duration: 200
      }).start();

      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          visible: false,
          animate: true
        }
      });

      Navigation.mergeOptions(this.props.componentId, {
        statusBar: { style: "dark" }
      });
    }

    if (this.props.onFocus) this.props.onFocus();
  }

  /**
   * Sets the search as blurred and evokes any side effects
   */
  searchBarBlurred() {
    this.setState({ searchBarFocused: false });

    if (Platform.OS === "ios") {
      Animated.timing(this.state.searchBarTopPadding, {
        useNativeDriver: true,
        toValue: 0,
        duration: 200
      }).start();

      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          visible: true,
          animate: true
        }
      });

      Navigation.mergeOptions(this.props.componentId, {
        statusBar: { style: "light" }
      });
    }

    if (this.props.onBlur) this.props.onBlur();
  }
}

RNNSearchBar.defaultProps = {
  placeholder: "search"
};

RNNSearchBar.propTypes = {
  search: PropTypes.string,
  componentId: PropTypes.string.isRequired,
  statusBarHeight: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  onSearchButtonPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClear: PropTypes.func,
  onCancel: PropTypes.func
};

/** -------------------------------------------- */
/**             Component Styling                */
/** -------------------------------------------- */
const styles = StyleSheet.create({
  searchContainerStyle: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: "#FFFFFF",
    zIndex: 999
  }
});
