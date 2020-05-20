
//Libs import
import * as React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
  TextInput,
  FlatList,
  TouchableOpacity,
  Picker,
  PickerItemProps,
  PickerProperties,
  ScrollView,
  AsyncStorage,

} from 'react-native';
//import{AppLoading, Asset } from 'expo'
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



//Components import
import {CustomHeader} from './components';


//Services import
import { iniciateState, initialState } from './services/inintialState'
import { pages } from './services'

import {HistoryPage,CartPage, Info, MainPage, Approval} from './pages';

import Icon  from  'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';
import {deleteHistory, addHistory} from './actions'

const App = (props) => {

  const Stack = createStackNavigator();
  const setCustomHeader = ({ navigation, route }) =>{
  return  {
    headerTitle: () =>
      <CustomHeader navigation={navigation} />,
    headerStyle: {
      backgroundColor: '#0288D1',
      height: 110,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    headerLeft: () =>  <Icon.Button 
    style={{
    width: 50, 
    padding: 0,
    margin: 0,
    paddingVertical: 40,
    justifyContent:'flex-end'
    }}
      name="arrow-with-circle-left"
      backgroundColor="transparent"
      size={30}
      onPress={()=>{
      if(navigation.canGoBack()){    
        props.goBack();       
        navigation.goBack();
      }       
      }}/>,

      headerRight: () =>  <Icon.Button
      style={{
        position:"relative",
      }}
      name="help-with-circle"
      backgroundColor="transparent"
      size={30}
     
      onPress={() =>{       
        props.addHistory(pages.info);
        navigation.navigate(pages.info);}}
    />
    
  }};

  return (

    <NavigationContainer style={{ height: '80%' }}>
      <Stack.Navigator initialRouteName="Main" >
      
        <Stack.Screen name={pages.info}
          component={Info}
          options={setCustomHeader} />

        <Stack.Screen name={pages.main}
          component={MainPage}
          options={setCustomHeader}         
        />
        <Stack.Screen name={pages.cart}
          component={CartPage}
          options={setCustomHeader}         
        />
         <Stack.Screen name={pages.history}
          component={HistoryPage}
          options={setCustomHeader}         
        />
         <Stack.Screen name={pages.approval}
          component={Approval}
          options={setCustomHeader}         
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({

  mainView: {
    display: "flex",
  },
  nameField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: "15%",
    paddingLeft: "5%",
    height: 50
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10

  },
  inputField: {
    width: "60%",
    borderColor: "#9E9E9E",
    borderWidth: 3,
    marginLeft: "5%",
    paddingHorizontal: 10
  },
  menuElement: {
    width: 100,
    textAlign: 'center',
    height: 20
  },
  menuElementActive: {
    borderBottomColor: 'red',
    borderBottomWidth: 3
  },
  visiblePage: {
    paddingHorizontal: 5,
    backgroundColor: "#B3E5FC",
    minHeight: "100%"
  },
  buttonPrimary: {
    height: 60,
    width: "100%",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#9E9E9E',
    color: "#FFFFFF",
    backgroundColor: "#03A9F4",
    padding: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    alignSelf: 'center',
  }
});

const mapStateToProps= (state)=>{
  return {
    history: state.history
  }
  }
  const mapDispatchToProps= (dispatch) =>{
    return {
        goBack: ()=> dispatch(deleteHistory()),
        addHistory: (pageName) => dispatch(addHistory(pageName))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(App);
