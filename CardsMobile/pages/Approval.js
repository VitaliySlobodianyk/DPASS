
import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
import {connect} from 'react-redux';
import {deleteHistory, addHistory, putBillId, putDate, putAmount, clearApprovalData} from '../actions'
import {sendApproval, pages} from '../services'

const Approval = (props) => {
   const {order}= props.route.params;
   const {billId,date,actualAmount} = props.user;

  const checkApprovalData= ()=> billId.trim().length>0 && date.trim().length>0 && actualAmount.trim().length>0;  
   
  const makeApproval= async ()=>{

    if(checkApprovalData()){
         
      const approval = {
            id: order.id,
            billId:billId,
            orderDate: order.date,
            payDate: date,
            sum: actualAmount
          }
      const result = await sendApproval(approval);
       if(result)
        {        
              alert('Approval sent successfully!');
              setTimeout(() => {
                props.clearApprovalData();
                props.goBack();
                props.navigation.navigate(pages.history);
                 
              }, 1000);
        }else{
          alert('Something went wrong retry!');
        }      

    }else{
      alert('Wrong data!')
    }
         

   }


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
              <Text> orderId {} </Text>
                </View>
                
                <TextInput      
              value={String(props.user.billId)}
              style={styles.inputField}
              placeholder="Enter ID of bill"        
              onChangeText={(id) => {
                 props.putBillId(id);
                }
              }
              
            />  
              
              <TextInput      
              value={String(props.user.date)}
              style={styles.inputField}
              placeholder="Enter date of payment"
              onChangeText={(date) => {
                 props.putDate(date);
                }
              }
              
            />  
              <TextInput      
              value={String(props.user.actualAmount)}
              style={styles.inputField}
              placeholder="Enter actual amount of payment"
              onChangeText={(amount) => {
                 props.putAmount(amount);
                }
              }
            />  
            <Button  title={"Approve Order"} onPress={makeApproval}></Button>
              
            </ScrollView>
        </View>
    );



};

const styles = StyleSheet.create({
    

});
const mapStateToProps= (state)=>{
    return {
      history: state.history,
      user: state.user
    }
    }
const mapDispatchToProps= (dispatch) =>{
      return {
          goBack: ()=> dispatch(deleteHistory()),
          addHistory: (pageName) => dispatch(addHistory(pageName)),
          putBillId: (billID)=> dispatch(putBillId(billID)),
          putAmount: (amount)=> dispatch(putAmount(amount)),
          putDate: (date)=> dispatch(putDate(date)),
          clearApprovalData: ()=> dispatch(clearApprovalData())
      }
    }

export default connect(mapStateToProps,mapDispatchToProps) (Approval);