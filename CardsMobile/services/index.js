import {pages} from './pagesStore'
import {prices} from './Prices'
import {iniciateState} from './inintialState'
import {sendData, checkOrders, sendApproval} from './httpManager'
import {readData,writeData} from './asyncStorageManager'
import {cardNames} from './CardNames'
import {getKeyDate, payDate, checkDate, checkAbilityToPay, orderStatus} from './dateServices'
import {calculatePriceOfPurchase} from './paymentCalculations'

export {pages,prices, iniciateState, sendData, sendApproval, checkOrders, readData, writeData, cardNames, getKeyDate, payDate, checkDate,checkAbilityToPay ,calculatePriceOfPurchase, orderStatus}