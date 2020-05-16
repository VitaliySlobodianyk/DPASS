export const orderStatus = {
  nextMonth: 'nextMonth',
  thisMonth: 'thisMonth',
  unable: 'unable',
};

const formatDate = (month, year) => {
  if (month > 12) {
    month %= 12;
    year++;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${month}/${year}`;
};

export const getKeyDate = () => {
  const orderDate = new Date();
  return orderDate.getDate() <= 10
    ? formatDate(orderDate.getMonth() + 1, orderDate.getFullYear())
    : formatDate(orderDate.getMonth() + 2, orderDate.getFullYear());
};

export const payDate = keyDate => {
  return `10/${keyDate}`;
};

export const checkDate = () => {
  const orderDate = new Date();
  return orderDate.getDate() <= 10
    ? {
        date1: formatDate(orderDate.getMonth() + 1, orderDate.getFullYear()),
        date2: formatDate(orderDate.getMonth() + 2, orderDate.getFullYear()),
      }
    : {
        date1: formatDate(orderDate.getMonth() + 2, orderDate.getFullYear()),
        date2: null,
      };
};

export const checkAbilityToPay = orderDate => {
  // check month  && day

  const today = new Date();
  const month = Number(orderDate.slice(0, 2));

  if (today.getDate() <= 10 && month - (today.getMonth() + 1) === 0) {
    return orderStatus.thisMonth;
  } else if (month - (today.getMonth() + 1) === 1) {
    return orderStatus.nextMonth;
  } else {
    return orderStatus.unable;
  }
};

export const getCurrentMonthShortened = () => {
  const orderDate = new Date();
  return formatDate(orderDate.getMonth() + 1, orderDate.getFullYear());
}

export const needUpdate = (oldDate) => {
return oldDate != getCurrentMonthShortened();
}
