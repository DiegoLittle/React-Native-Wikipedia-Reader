import * as React from 'react';
import { GLOBAL } from '../../view/elements/custom';
import { CTEXT } from '../../view/elements/custom';
import locale from '../../constants/locale';
import router from '../../../../react-native-typescript-boilerplate/old_src/navigators/router';
// import { Card, Carousel } from '../../../../react-native-typescript-boilerplate/old_src/view/elements/layout';
// import { BUTTON_DEFAULT } from '../../../../react-native-typescript-boilerplate/old_src/view/elements/buttons';
import tw from 'twrnc';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Bookmark} from '../../../shared/types'
interface Props {
  bookmark?: Bookmark;
  onClick: () => void;
}



const BookmarkWidget: React.FC<Props> = ({ bookmark,onClick }: Props) => {
  // const [count, setCount] = React.useState(0);
  if(bookmark?.description){
    console.log(bookmark?.description.length)
    console.log()
  }
  return (
    <TouchableOpacity style={tw`w-full h-24 my-0`} onPress={onClick}>
      {bookmark.title && <CTEXT style={tw`px-6 pt-4 text-xl font-bold text-black dark:text-white`} className={tw``}>{bookmark.title}</CTEXT>}
      {bookmark?.description && <Text numberOfLines={3} style={tw`px-6 py-1 text-black dark:text-white`} className={tw``}>{bookmark.description.length > 200 ? bookmark?.description.substring(0,200) + "..." : bookmark.description}</Text>}
      
    </TouchableOpacity>
    
  );
};

export default BookmarkWidget;