
import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
} from 'react-native';

const Info = () => {

   // const [state, setstate] = useState({ infoShown: true });
    // const renderRow = (data) => {
    //     return (
    //         <Text>{`\u2022 ${data}`}</Text>
    //     );
    // }
    //   <ListView
    //   style={{margin: 40}}
    //   dataSource={dataSource}
    //   renderRow={this.renderRow}
    // />


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


export default Info;