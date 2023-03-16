import React from 'react';

const WrapInfo = props => {
  const { title, price, discount, discountRate } = props;

  return (
    <div className="wrap_info">
      <span className="list_title">{title}</span>
      <span className="list_price"> {price.toLocaleString()}</span>
      <span className="list_discount">{discount.toLocaleString()}원</span>
      <span className="list_discount_rate">{discountRate}</span>
    </div>
  );
};

export default WrapInfo;