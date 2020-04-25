import {ADD_CARD, DELETE_CARD, ADD_HISTORY, DELETE_HISTORY, CHANGE_GROUP, CHANGE_NAME, CHANGE_PHONE,
PUT_ORDER_IN_HISTORY, CHANGE_TYPE, CHANGE_LIMIT, CHANGE_QUANTITY, CLEAR_CART, CHANGE_CARD, REFRESH, TIE_CHECKED_ORDERS_TO_HISTORY, 
PUTDATE, PUTBILLID, PUTAMOUNT, CLEARAPPROVAL} from './types';

export const addCard= (card)=>({
    type: ADD_CARD,
    card
})
export const deleteCard= (id)=>({
    type: DELETE_CARD,
    id
})

export const changeCard= (index,card)=>({
    type: CHANGE_CARD,
    index,
    card
})



export const putOrder= (order)=>({
    type: PUT_ORDER_IN_HISTORY,
    order
})

export const tieCheckedOrdersToHistory = (checkedOrders) => ({
    type: TIE_CHECKED_ORDERS_TO_HISTORY,
    checkedOrders
})

export const clearCart= ()=>({
    type: CLEAR_CART
})

export const addHistory= (pageName)=>({
    type: ADD_HISTORY,
    pageName
})
export const deleteHistory= ()=>({
    type: DELETE_HISTORY
})

export const changeName= (name)=>({
    type: CHANGE_NAME,
    name
})
export const changeGroup= (group)=>({
    type: CHANGE_GROUP,
    group
})
export const changePhone= (phone)=>({
    type: CHANGE_PHONE,
    phone
})

export const changeType= (type)=>({
    type: CHANGE_TYPE ,
    cardType: type
})
export const changeLimit= (limit)=>({
    type: CHANGE_LIMIT,
    limit
})
export const changeQuantity= (quantity)=>({
    type: CHANGE_QUANTITY,
    quantity
})

export const refresh= ()=> ({
    type: REFRESH
})


export const putDate= (date)=> ({
    type: PUTDATE,
    date
})
export const putBillId= (billId)=> ({
    type: PUTBILLID,
    billId
})
export const  putAmount= (amount)=>({
    type: PUTAMOUNT,
    amount
})

export const  clearApprovalData= ()=>({
    type: CLEARAPPROVAL
})
