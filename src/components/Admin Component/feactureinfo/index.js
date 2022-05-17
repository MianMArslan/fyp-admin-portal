import React, { useState, useEffect } from "react";
import "./feactureinfo.css";
import { GET } from "../../../services/httpClient";
import RingLoader from "react-spinners/RingLoader";
import CountUp from "react-countup";
import { Box } from "@mui/material";

const FeaturedInfo = () => {
  const [tCount, setTCount] = useState("");
  const [aCount, setACount] = useState("");
  let [color, setColor] = useState("#fb9e00");
  const [progressTourist, setProgressTourist] = useState(false);
  const [progressAgency, setProgressAgency] = useState(false);
  const [booking, setBooking] = useState("");

  useEffect(() => {
    getTouristCount();
    getAgencyCount();
    getAllBooking();
  }, []);

  async function getTouristCount() {
    let res = await GET("/user/touristCount");
    setTimeout(() => {
      setProgressTourist(true);
      setTCount(res);
    }, 2500);
  }
  async function getAgencyCount() {
    let res = await GET("/user/agencyCount");
    setTimeout(() => {
      setProgressAgency(true);
      setACount(res);
    }, 3500);
  }
  async function getAllBooking() {
    let res = await GET("/admin/booking");
    if (res) {
      setTimeout(() => {
        setProgressAgency(true);
        setBooking(res);
      }, 3500);
    }
  }
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Tourist</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {progressTourist ? (
              <CountUp end={tCount} duration={1.5} />
            ) : (
              <Box
                style={{
                  height: "100%",
                  width: "100",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RingLoader color={color} loading={!progressTourist} />
              </Box>
            )}
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Agencies</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {progressAgency ? (
              <CountUp end={aCount} duration={1} />
            ) : (
              <Box
                style={{
                  height: "100%",
                  width: "100",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RingLoader color={color} loading={!progressAgency} />
              </Box>
            )}
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Booking</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {progressTourist ? (
              <CountUp end={booking} duration={1.5} />
            ) : (
              <Box
                style={{
                  height: "100%",
                  width: "100",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RingLoader color={color} loading={!progressTourist} />
              </Box>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
export default FeaturedInfo;
