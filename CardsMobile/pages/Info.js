import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
} from 'react-native';

let infoUploaded= false;

import {getInfo} from '../services'

const Info = () => {
  
  const syncInfo= async() => {
   
        const info = await getInfo();
        console.log(info);
       if(info){
        infoUploaded=true;
       }      
  }

   if(!infoUploaded){
       syncInfo();
   }





    return (
        <View style={{
            height:130
        }}>
            <ScrollView style={{ flex: 1 }}>
                <View >
                    <Text>
                        Info
                    </Text>         
                </View>

                <View>
                    <Text>Правила використання</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    

});


export default  Info;