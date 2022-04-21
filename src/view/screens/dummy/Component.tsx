import * as React from 'react';
import { SafeAreaView, View,Text } from 'react-native';

import { GLOBAL } from '../../styles/global';
import { CTEXT } from '../../elements/custom';
import tw from 'twrnc'
import { Props } from './index';
import { RNNSearchBar } from "../../widgets/RNNSearchBar";
import { useState } from 'react';

const DUMMY: React.FC<Props> = (props: Props) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  return(
    <SafeAreaView style={tw`mb-4`}>
     
      <View>
        <Text style={tw`pl-6 pt-4 text-2xl font-semibold`}>{props.dummyText}</Text>
      </View>
    </SafeAreaView>
  );
}

export default DUMMY;
