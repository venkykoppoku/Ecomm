export const getPriceQueryParams = (serachParams, key, value) => {
  const hasKeyInSearchParams = serachParams?.has(key);

  if (value && hasKeyInSearchParams) {
    serachParams.set(key, value);
  } else if (value) {
    serachParams.append(key, value);
  } else if (hasKeyInSearchParams) {
    serachParams.delete(key);
  }
  return serachParams;
};

export const calculateOrderTotal = (cartItems) => {
  const itemsPrice = Number(
    cartItems
      .reduce((acc, item) => acc + item?.quantity * item?.price, 0)
      .toFixed(2)
  );
  const shippingAmount = itemsPrice < 500 ? 25 : 0;
  const taxAmount = Number((0.15 * itemsPrice).toFixed(2));
  const totalAmount = (itemsPrice + shippingAmount + taxAmount).toFixed(2);
  return {
    itemsPrice,
    shippingAmount,
    taxAmount,
    totalAmount,
  };
};
