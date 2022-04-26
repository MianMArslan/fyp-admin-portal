import React from "react";
import "./feactureinfo.css";

const FeaturedInfo = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Tourist</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Agencies</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Add Booked</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
        </div>
      </div>
    </div>
  );
};
export default FeaturedInfo;
