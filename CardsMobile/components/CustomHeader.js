import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    TouchableHighlight,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { pages } from '../services'
import { Header } from './'
import {connect} from 'react-redux'
import {addHistory} from '../actions'

const CustomHeader = (props) => {
    const navigation=  props.navigation;
    const setMenuElementFocus = (menuElementName) => { 
        return  props.history.pageHistory[props.history.pageHistory.length-1] === menuElementName ?
            Object.assign({}, styles.menuElement, styles.menuElementActive) :
            styles.menuElement
    }
    const setActivePage = (pageName) => {
        setstate(prevstate => {
            prevstate.ui.activePage.push(pageName);
            return prevstate;
        })
    }

    return (
        <View style={styles.container} >
            <View style={styles.mainView}>
                <Header style= {{
                    fontWeight: "bold"
                }} title={"Pass"}/>
            </View>
            <View style={styles.menu}>
                <Text style={setMenuElementFocus(pages.main)}
                    onPress={() => {
                        props.addHistory(pages.main);
                        navigation.navigate(pages.main);
                    }}>
                    Order
       </Text>
                <Text style={setMenuElementFocus(pages.cart)} onPress={() => {
                     props.addHistory(pages.cart);
                    navigation.navigate(pages.cart);
                }}>
                    Cart
       </Text>
                <Text style={setMenuElementFocus(pages.history)} onPress={() => {
                    props.addHistory(pages.history);
                    navigation.navigate(pages.history);
                }}>
                    History
       </Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignSelf: 'center',
        width: 300,
        paddingBottom: 20,
    },
    mainView: {
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 40
    },

    menu: {
        position: "relative",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: -20,
        left: -20

    },
    inputField: {
        width: "60%",
        borderColor: "#9E9E9E",
        borderWidth: 3,
        marginLeft: "5%",
        paddingHorizontal: 10
    },
    menuElement: {
        width: "30%",
        textAlign: 'center',
        height: 20,
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        color: '#fff'
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
          addHistory: (pageName)=> dispatch(addHistory(pageName))
      }
    }
export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader);
