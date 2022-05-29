import React, { useState, useEffect } from "react";
import "./home.css";
import FeaturedInfo from "../feactureinfo";
import WidgetLg from "../widgetLg/WidgetLg";
import WidgetSm from "../widgetSm/WidgetSm";
import { GET } from "../../../services/httpClient";

const Home = () => {
  const [rows, setRows] = useState("");
  const [ads, setAds] = useState("");
  const [progressNewUser, setProgressNewUser] = useState(false);
  const [progressNewAd, setProgressNewAd] = useState(false);

  async function getNewJoinUser() {
    let res = await GET("/admin/newJoin");
    if (res) {
      setRows(res);
      setProgressNewUser(true);
    }
  }

  async function getNewAd() {
    let res = await GET("/admin/newAds");
    if (res) {
      setAds(res);
      setProgressNewAd(true);
    }
  }

  useEffect(() => {
    getNewJoinUser();
    getNewAd();
  }, []);
  return (
    <>
      <div className="widgets">
        <FeaturedInfo />
      </div>

      <div className="homeWidgets">
        {progressNewUser && <WidgetSm rows={rows} />}
        {progressNewAd && <WidgetLg rows={ads} />}
      </div>
    </>
  );
};

export default Home;
