import * as React from 'react';
import { SafeAreaView, View,Text, TouchableOpacity, ScrollView } from 'react-native';

import { GLOBAL } from '../../styles/global';
import { CTEXT } from '../../elements/custom';
import tw from 'twrnc'
import { Props } from './index';
import { RNNSearchBar } from "../../widgets/RNNSearchBar";
import { useEffect, useState } from 'react';
import { Navigation } from 'react-native-navigation';
import router from '../../../navigators/router';

const Search: React.FC<Props> = (props: Props) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(()=>{
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        visible: true,
        animate: true
      }
    });
  })
  const getWikiPageHTML = async (search: string) => {
    let res= await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${search}&prop=text&formatversion=2&format=json`)
    // let res = await fetch("https://en.wikipedia.org/w/index.php?action=render&title=Pet_door")
    let data = await res.json()
    var content = data.parse.text
    return  content
  }
  const showPushScreen = async (item,componentId) => {
    // const { componentId } = props.componentId;
    // let res = await fetch('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Pet_door&rvslots=%2A&rvprop=content&formatversion=2&format=json')
    // let res= await fetch('https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&prop=wikitext&formatversion=2&format=json')
    // // let res = await fetch("https://en.wikipedia.org/w/index.php?action=render&title=Pet_door")
    // let data = await res.json()
    
    // var content = data.parse.text
    // // var content = data.query.pages[0].revisions[0].slots.main.content
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
  return(
    <SafeAreaView style={tw`mt-4`}>
      <RNNSearchBar
      onCancel={()=>{
        Navigation.pop(props.componentId)
      }}
      
      componentId={props.componentId} // <-- RNN component id
      statusBarHeight={0} // <-- prop status bar height
      search={search}
      onChangeText={async (e)=>{
        setSearch(e)
        if(e.length != 0){
          
          // let res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=cirruscompsuggestbuilddoc&prop=pageimages&list=search&srsearch=${e}&utf8=&format=json`)
          // let res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${e}&srlimit=20&srwhat=text&format=json`)
          let res = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${e}&limit=20&format=json`)
        // let res = await fetch(`https://www.mediawiki.org/w/api.php?action=query&generator=search&gsrsearch=${e}&prop=pageimages&format=json`)
        let data = await res.json()
        console.log(data[1])
        // console.log(data.query.search.length)
        // let keys = Object.keys(data.query.pages)
        // let pages = []
        // keys.forEach(key => {
        //   pages.push(data.query.pages[key])
        //   console.log(data.query.pages[key])
        // })
        var results = data[1].map((item,index)=>{
          return {
            title: item,
          }
        })
        
        // setSearchResults(pages)
        setSearchResults(results)
        // setSearchResults(data.query.search)
        // data.query.search.forEach((item)=>{
        //   // console.log(item.title)
        //   // console.log(item.snippet)
        // })
        }
        
      }}
      style={tw`h-12`}
      
     />
      <ScrollView style={tw`mt-4`}>
      {searchResults.map((item, index)=>{
        return(
          <TouchableOpacity onPress={async()=>{
            await showPushScreen(item,props.componentId)
          }} key={index} style={tw`mx-4 my-2`}>
            <Text style={tw`text-lg dark:text-white`}>{item.title}</Text>
            {/* <Text>{item.snippet}</Text> */}
          </TouchableOpacity>
        )
      })}
      </ScrollView>

      {/* <View>
     <Text style={tw`pl-6 pt-4 text-2xl font-semibold`}>{props.dummyText}</Text>
     </View> */}
    </SafeAreaView>
  );
}

export default Search;
