import * as React from 'react';
import { SafeAreaView, View,Text, ScrollView } from 'react-native';

import { GLOBAL } from '../../styles/global';
import { CTEXT } from '../../elements/custom';
import { useSelector } from 'react-redux';
import tw from 'twrnc'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { Navigation } from 'react-native-navigation';
interface Props {}

const DRAWER: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const current_page = useSelector(state => state.app.current_page)
  var sections = []
  if(typeof(current_page)!='undefined'&& current_page != null){
    try {
      current_page.sections().forEach((section, index) => {
        sections.push(section.json().title)
      })
    } catch (error) {
      
    }
  //   if(Object.keys(current_page).length>0){

  // }
  }
  // useEffect(()=>{

  // },[current_page])
  return(
  <SafeAreaView style={GLOBAL.LAYOUT.SafeArea}>
    <ScrollView style={GLOBAL.LAYOUT.pageContainer}>
      <CTEXT>{'Drawer Menu'}</CTEXT>
      {sections.map((section, index) => 
      <Text key={index} onPress={()=>{
        Navigation.mergeOptions(props.componentId, {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        });
        dispatch({type:'current_section/set',payload:section})
      }} style={tw`text-xl font-semibold my-2`}>{section}</Text>
      )}
    </ScrollView>
  </SafeAreaView>
)}

export default DRAWER;
