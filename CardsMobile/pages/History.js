import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useState} from 'react';
import HistoryCell from '../components/HistoryCell';
import Card from '../components/Card';
import {uuid} from 'uuidv4';
import {
  addCard,
  deleteCard,
  changeCard,
  changeType,
  changeLimit,
  changeQuantity,
  changeName,
  changeGroup,
  changePhone,
  tieCheckedOrdersToHistory,
} from '../actions';
import {connect} from 'react-redux';
import {
  getKeyDate,
  checkDate,
  checkOrders,
  writeData,
  readData,
} from '../services';

const HistoryPage = props => {
  const history = props.cards.history;
  const datesToCheck = checkDate();
  const [refreshing, refresh] = useState({
    refreshing: false,
    lastRefreshed: new Date().getTime() - 1000 * 60 * 5,
  });
  const ordersToCheck = history
    .filter(
      order =>
        order.date === datesToCheck.date1 || order.date === datesToCheck.date2,
    )
    .map(({id, date, approved}) => ({id, date, approved}));

  const handlerefresh = () => {
    if (new Date().getTime() - refreshing.lastRefreshed > 1000 * 60 * 5) {
      console.log('Sended update');
      refreshStatuses();
    }else{
      console.log('Brutforced update');
    }
  };

  const refreshStatuses = async () => {
    refresh(prevRefresh => ({
      refreshing: true,
      lastRefreshed: prevRefresh.lastRefreshed,
    }));
    try {
      result = await checkOrders(ordersToCheck);
      if (result != null) {
        await props.tieCheckedOrdersToHistory(result);
        await writeData({
          id: props.user.id,
          name: props.user.name,
          group: props.user.group,
          phone: props.user.phone,
          cards: props.cards.cards,
          history: props.cards.history,
        });
      } else {
        alert(`Something wrong with network connection or serever!\n
       Try later...`);
      }
    } catch (error) {}
    refresh({
      refreshing: false,
      lastRefreshed: new Date().getTime(),
    });
  };

  if (history.length > 0) {
    return (
      <View
        style={{
          height: '100%',
        }}>
        <FlatList
          data={history}
          onRefresh={handlerefresh}
          refreshing={refreshing.refreshing}
          renderItem={({item}) => {
            return (
              <HistoryCell
                key={uuid()}
                navigation={props.navigation}
                order={item}
              />
            );
          }}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>No orders in history!</Text>
        <Text>Make order first</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#9E9E9E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    marginTop: 10,
    padding: 5,
  },
  font: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});
const mapStateToProps = state => {
  return {
    cards: state.cards,
    // cardConfig: state.cardConfig,
    user: state.user,
    history: state.history,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addCard: card => dispatch(addCard(card)),
    deleteCard: id => dispatch(deleteCard(id)),
    changeCard: (index, card) => dispatch(changeCard(index, card)),
    changeType: type => dispatch(changeType(type)),
    changeLimit: limit => dispatch(changeLimit(limit)),
    changeQuantity: quantity => dispatch(changeQuantity(quantity)),
    changeName: name => dispatch(changeName(name)),
    changeGroup: group => dispatch(changeGroup(group)),
    changePhone: phone => dispatch(changePhone(phone)),
    goBack: () => dispatch(deleteHistory()),
    addHistory: pageName => dispatch(addHistory(pageName)),
    refresh: () => dispatch(refresh()),
    tieCheckedOrdersToHistory: checkedOrders =>
      dispatch(tieCheckedOrdersToHistory(checkedOrders)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryPage);
