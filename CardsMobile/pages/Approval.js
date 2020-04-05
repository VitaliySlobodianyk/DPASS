
import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Button,
} from 'react-native';
import {useState} from 'react'
import {connect} from 'react-redux';
import {deleteHistory, addHistory} from '../actions'
import ImagePicker from 'react-native-image-picker';

const Approval = (props) => {
   const {orderId}= props.route.params;


const[state, setState ] = useState( {
photo: null
})
 
const renderPhoto= ()=>{
 
 return state.photo? <Image source={state.photo} style={{
        height: 500,
        width: '100%',
        borderWidth: 2,
        borderColor: 'grey'
    }} /> : null

}


// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
   
    return (
        <View style={{
         height: 900
        }}>
            <ScrollView style={{ flex: 1 }}>
                <View >
                    <Text>
                        Info
                    </Text>         
                </View>

                <View>
    <Text> orderId {orderId} </Text>
                </View>
              {renderPhoto()}
           
           <Button 
           title= {"Upload Bill"}
           onPress={()=>{
                
ImagePicker.showImagePicker(options, (response) => {
 //console.log('Response = ', response); //response.data - base64 string
   
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
   
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
   
      setState({photo: response.path});
      console.log(state.photo);
    }
  }); 

           }}>Upload Photo</Button>

            </ScrollView>
        </View>
    );



};

const styles = StyleSheet.create({
    

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

export default connect(mapStateToProps,mapDispatchToProps) (Approval);