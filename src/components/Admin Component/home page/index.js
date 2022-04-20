import React from 'react'
import "./home.css"
import FeaturedInfo from '../feactureinfo'
import WidgetLg from '../widgetLg/WidgetLg'
import WidgetSm from '../widgetSm/WidgetSm'

const Home = () => {
  return (
    <>
        <div className="widgets">
          <FeaturedInfo />
        </div>
        
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
    </>
  )
}

export default Home