const URL = 'http://192.168.0.103:8000';

export const sendData = async (order) => {
  let succes = true;

  await fetch(`${URL}/newOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order)
  }).then(response => {
    if (response.status != 200) {
      succes = false;
    }
  }).catch(err => {
    console.log(err)
    succes = false;
  });
  return succes;
}

export const sendApproval = async (approval) => {
  let succes = true;
  await fetch(`${URL}/approveOrder`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(approval)
  }).then(response =>{
    if (response.status != 200) {
      succes = false;
    }
  }).catch(err => {
    console.log(err)
    succes = false;
  });
  return succes;
}

export const checkOrders = async (ordersArray) => {
  let data = null;

  await fetch(`${URL}/checkOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ordersArray)
  }).then(async (response) => {
    if (response.status === 200) {
      console.log("DATA FROM CHECK");
      console.log(response);
    await response.json().then(json=>{
      console.log(json);
      data=  JSON.parse(JSON.stringify(json));
      }).catch(err=>{
        console.log(err);
      });
      
    }
  }).catch(err => {
      console.log(err)
      console.log(err);
    });
  return data;
}



export const getPrices = async () => {
  let data = null;

  await fetch(`${URL}/price`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.status === 200) {
      console.log("PRICES");
      console.log(response);
    await response.json().then(json=>{
      console.log(json);
      data=  JSON.parse(JSON.stringify(json));
      }).catch(err=>{
        console.log(err);
      });
    }
  }).catch(err => {
      console.log(err)
      console.log(err);
    });
  return data;
}



export const getInfo = async (ordersArray) => {
  let data = null;

  await fetch(`${URL}/info`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ordersArray)
  }).then(async (response) => {
    if (response.status === 200) {
      console.log("DATA FROM CHECK");
      console.log(response);
    await response.json().then(json=>{
      console.log(json);
      data=  JSON.parse(JSON.stringify(json));
      }).catch(err=>{
        console.log(err);
      });
      
    }
  }).catch(err => {
      console.log(err)
      console.log(err);
    });
  return data;
}




