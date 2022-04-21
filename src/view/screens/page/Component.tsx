import * as React from 'react';
import { Share,Linking,StyleSheet,Image,SafeAreaView, View, Text, ScrollView, TouchableOpacity, Pressable, TextInput, useColorScheme } from 'react-native';

import { GLOBAL } from '../../styles/global';
import { CTEXT } from '../../elements/custom';
import tw from 'twrnc'
import { Props } from './index';
import { RNNSearchBar } from "../../widgets/RNNSearchBar";
import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import wtf from 'wtf_wikipedia'
import wtf_html from 'wtf-plugin-html'
import reactStringReplace from 'react-string-replace';
import router from '../../../navigators/router';
import { Navigation } from 'react-native-navigation';
import { showBookmarks } from '../../../navigators/navigation';
import { SCREENS } from '../../../constants/screen';
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {addedBookmark} from '../../../../shared/redux/thunk/app'
import { useDispatch } from 'react-redux'
import FitImage from './FitImage';


wtf.extend(wtf_html)


const Page: React.FC<Props> = (props: Props) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { width,height } = useWindowDimensions();
  const [sections, setSections] = useState([])
  const [content, setContent] = useState('')
  const [pageSaved, setPageSaved] = useState(false)
  const [isLoaded,setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const bookmarks = useSelector(state => state.app.bookmarks)
  const current_section = useSelector(state => state.app.current_section)
  const [sectionPositions,setSectionPositions] = useState([])
  const colorScheme = useColorScheme()
  const [showReference,setShowReference] = useState(-1)
  // var sectionPositions = []

  // console.log(isLoading)
  // const [pageData, setPageData] = useState({
  //   saved: false,
  // })
  var styles = StyleSheet.create({
    fitImage: {
      borderRadius: 20,
    },
    fitImageWithSize: {
      height: 100,
      width: 30,
    },
  });
  function included(bookmarks, title) {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].title === title) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    async function getWiki() {
      try {
        let doc = await wtf.fetch(props.title)
        dispatch({ type: 'current_page/set', payload: doc })
        setSections(doc.sections())
        // console.log(doc.sections()[0].links()[0].json())
        // For each section replace the links with button component
        // Format the text with bolds and italics

        // console.log(doc.json().sections[0].paragraphs[0].sentences[0])
        setContent(doc.html())
      } catch (error) {
        console.log(error)
        console.log(props.title)
      }
      setIsLoaded(true)
      if(included(bookmarks,props.title)){
        setPageSaved(true)
      }


    }
    getWiki()
    

  }, [props.title])

  useEffect(()=>{
    // find section position from current_section with filter
    sectionPositions.forEach((position,index)=>{
      // console.log(position.section)
      if(position.section == current_section){
        // console.log(position.position)
        scrollViewRef.current?.scrollTo({x:0,y:position.position,animated:true})
      }
      // console.log(current_section)
    })
    // console.log(position)
    
  },[current_section])
  // Capitalize every word in a string
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function getBoldsItalics(section, section_text) {
    if (typeof (section.json().paragraphs) != 'undefined') {
      section.json().paragraphs.forEach((paragraph: any) => {
        paragraph.sentences.forEach((sentence: any) => {
          if (typeof (sentence.formatting) != 'undefined') {

            var italics = sentence.formatting.italic
            var bolds = sentence.formatting.bold
            if (typeof (italics) != 'undefined') {
              italics.forEach((italic: any) => {
                // section_text = section_text.replace(section_text, <Text >{}</Text>)
                // console.log("italic",italic)
                section_text = reactStringReplace(section_text, italic, (match, i) => (
                  <Text style={tw`italic`} >{match}</Text>
                ))
              })
            }
            if (typeof (bolds) != 'undefined') {
              bolds.forEach((bold: any) => {
                // section_text = section_text.replace(section_text, <Text >{}</Text>)
                // console.log("bold",bold)
                section_text = reactStringReplace(section_text, bold, (match, i) => (
                  <Text style={tw`font-bold`} >{match}</Text>
                ))
              })
            }
          }
        })
      })
    }
    return section_text
  }
  function getSection(section: any) {
    // console.log("Getting section " + section.title())
    var t0 = performance.now()

    var section_text = section.text()
    var images = section.images()
    var references = section.references()
    // Filter references with empty data

    if(references.length>0){
      references = references.map((reference)=>{
        return(reference.json())
      })
    }
    references = references.filter((reference: any) => {
      return reference.type != 'inline'
    })
    // var showReference=true
    // var paragraphs = section.paragraphs()
    // paragraphs.forEach((paragraph)=>{
    //   console.log(paragraph.json())
    //   // if(typeof(paragraph.references())!='undefined'){
    //   //   console.log(paragraph.references())
    //   // }
    // })
    if(images.length>0){
      images.forEach((image,index)=>{
        let new_image=image.json()
        new_image.url = image.url().replace("https://wikipedia.org/wiki/Special:Redirect/file","https://commons.wikimedia.org/wiki/Special:FilePath")+"?width="+width
        images[index] = new_image
      })
    }
    section_text = getBoldsItalics(section, section_text)
    // console.log(.paragraphs[0].sentences[0].formatting)
    // if (section.templates().length > 0) {
    //   // console.log(section.templates())
    //   section.templates().forEach(template => {
    //     console.log(template.json())
    //   })
    // }
    // console.log(typeof(section.links())=='undefined')
    // console.time("links")

    section.links().forEach(link => {
      // console.log(link.json())
      if (link.json().text != 'undefined') {
        section_text = reactStringReplace(section_text, link.json().text, (match, i) => (
          <Text onPress={async() => {
            // console.log(link.json().page)
            if(typeof(link.json().page)=='undefined'){
              router.showWebPage({
                componentId:props.componentId,
                passProps: {
                  url: link.json().site,
                },
              });
              
              // console.log(link.json())
            }
            else{
              router.pushPage(link.json().page)
            }
            // Navigation.setRoot({
            //   root: {
            //     component: { 
            //       name: SCREENS.Page,
            //       passProps:{
            //         title:link.json().page
            //       }
            //      },
            //   },
            // });
            

            // router.showPageScreen({
            //   // props.componentId,
            //   passProps: {
            //     title: link.json().page,
            //   },
            // });
          }} style={tw`text-blue-500 text-lg`}>{match}</Text>
        ))
      }
    })

    // console.timeEnd("links")

    var section_jsx = (
      <>
        <Text style={tw`text-xl font-bold mt-3 dark:text-white`}>{section.title()}</Text>
        {/* <Image 
         source={{uri:"https://upload.wikimedia.org/wikipedia/commons/4/40/Mus%C3%A9e_de_l%27Elys%C3%A9e_3.jpg"}}></Image> */}
        {images.map((image,index)=>
        <View key={index}>
        
        {/* <Text>Hello World</Text> */}
        <FitImage
        resizeMode="contain"
        source={{uri:image.url}}
        style={tw``}
        style={styles.fitImage}
/>
        {/* <Image 
        // style={{width:250,height:250}}
        style={tw.style({width:width*.75,height:height*.75},'mx-auto')}
        resizeMethod={'scale'}
        resizeMode={'contain'}
        source={{uri:image.url}}></Image> */}
        <Text style={tw`my-3 text-center dark:text-white`}>{image.caption}</Text>
        </View>
        )}
        <Text
        
        onSelectionChange={(event) => {
          // console.log(Object.keys(event))
          // console.log(event.nativeEvent.selection)
          // console.log(section.text().toString())
          console.log(section.text().substring(event.nativeEvent.selection.start,event.nativeEvent.selection.end))
          // console.log(Object.keys(event.target))
        }}
          editable={false}
          multiline={true}
          scrollEnabled={false}
         style={tw`text-lg dark:text-white`}>
          {section_text}
        </Text>
        <View style={tw`flex-row`}>

        {references.map((reference,index)=>
        <View>
          { showReference==index?
          <View  style={tw`absolute bottom-4 bg-white w-64 h-64 p-2 rounded`}>
            <Text>{reference.first&&
            <>
            {reference.last}, {reference.first} 
            {reference.year && <>({reference.year})</>}
            </>
            }</Text>
            
            <Text>{reference.title}. {reference.journal}</Text>
            {reference.conference && <Text>{reference.conference}</Text>}
            {reference.publisher && <Text>{reference.publisher}</Text>}
            {reference.doi && <Text>DOI: {reference.doi}.</Text>}
            {reference.citeseerx && <Text>CiteSeerX: {reference.citeseerx}</Text>}
          </View>:null
        }
          <Text 
        style={tw`text-blue-500`}
        onPress={()=>{
          if(showReference==index){
            setShowReference(-1)
          }
          else{
            setShowReference(index)
          }
        }}>[{index}]</Text>
        </View>
        
        )}
        </View>

      </>
      // <View style={tw`mt-4`}>
      //   <Text style={tw`text-2xl font-bold`}>{section.title}</Text>
      //   <Text style={tw`text-lg`}>{section.text()}</Text>
      // </View>
    )
    var t1 = performance.now()
    // console.log("Call to links took " + (t1 - t0) + " milliseconds.")
    return section_jsx
  }

  function showBurgerMenu () {
    Navigation.mergeOptions('drawerComponentId', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  }
  
  const scrollViewRef = useRef();
  var section_positions = []
  return (
    <SafeAreaView style={tw`mb-4`}>
      {isLoaded ?
      <>
      <ScrollView ref={scrollViewRef}>
        <TextInput 
        editable={false}
        multiline={true}
        scrollEnabled={false}
        style={tw`pl-6 pt-4 text-2xl font-semibold dark:text-white`}>{capitalize(props.title)}</TextInput>
        {sections.map((section, index) =>
          <View style={tw`mx-6 dark:text-white`} key={index} 
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            // console.log('height:', layout.height);
            // console.log('width:', layout.width);
            // console.log('x:', layout.x);
            // console.log('y:', layout.y);
            // console.log(layout.y)
            // console.log(section.title())
            let position = {
              section:section.title(),
              position:layout.y
            }
            console.log("section position",position)
            setSectionPositions(prevPositions=>[...prevPositions,position])
            // sectionPositions.push(position)
            // console.log(sectionPositions)
            // section_positions.push(layout.y)
          }}
          >

            {getSection(section)}
            {/* <Text>{index}</Text> */}
            {console.log("sections",index)}
            {/* <Text>{reactStringReplace(section.text(), "computing", (match, i) => (
              <Text style={tw`text-red-500`}>{match}</Text>
            ))}</Text> */}
            {/* <Text>{}</Text> */}
          </View>
        )}
        {/* <Text>{props.content}</Text> */}
        {/* <RenderHtml
        baseStyle={tw`text-lg mx-6`}
      contentWidth={width}
      source={source}
      renderersProps={renderersProps}
    /> */}
      </ScrollView>
      <View style={tw`flex-row w-full h-20 justify-between px-12 pt-2`}>
        <Icon
        // iconStyle={tw}
        onPress={showBurgerMenu}
        color={colorScheme == 'dark' ? 'white' : 'black'}
        // containerStyle={tw`w-1/3`}
        // iconStyle={tw`flex`}
        name="menu"
        size={32}
        ></Icon>
        {pageSaved ? 
        <Icon
        color={colorScheme == 'dark' ? 'white' : 'black'}
          // className={tw`bg`}
          onPress={() => {
            dispatch({ type: 'bookmarks/remove_by_title', payload: props.title })
            setPageSaved(false)
          }}
          name="bookmark"
          size={32}
          iconStyle={tw`my-auto`}
          // containerStyle={tw`w-1/3`}
        ></Icon> : <Icon
        color={colorScheme == 'dark' ? 'white' : 'black'}
          // className={tw`bg`}
          onPress={() => {
            // dispatch({type:"test"})
            // console.log()
            let bookmark = {
              title:props.title,
              isSynced:false,
              description:sections[0].paragraphs()[0].text()
            }
            dispatch({ type: 'bookmarks/add', payload: bookmark })
            setPageSaved(true)
          }}
          name="bookmark-outline"
          size={32}
          iconStyle={tw`my-auto`}
        ></Icon>
        }
        <Icon
        color={colorScheme == 'dark' ? 'white' : 'black'}
        name="share-outline"
        size={32}
        type="ionicon"
        onPress={async()=>{
          try {
            const result = await Share.share({
              url:"https://en.wikipedia.org/wiki/"+props.title
            }
            //   {
            //   message:
            //     'React Native | A framework for building native apps using React',
            // }
            
            );
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                console.log(result.activityType);
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
        }}
        >

        </Icon>

      </View>
      </>:<></>}
    </SafeAreaView>
  );
}

export default Page;


