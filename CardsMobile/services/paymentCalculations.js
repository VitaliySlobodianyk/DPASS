export const calculatePriceOfPurchase = (cardList) => {
    if (cardList.length > 0) {
        let acc = 0;
        cardList.forEach((card) => {
            acc += (card.quantity * card.price);
        })
        return acc;
    }
    else {
        return 0;
    }
}