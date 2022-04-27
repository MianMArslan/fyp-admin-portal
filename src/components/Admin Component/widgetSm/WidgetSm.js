import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import img1 from "../../images/off the beaten track.png";

export default function WidgetSm(props) {
  const { rows } = props;
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {rows.map((row) => (
          <li className="widgetSmListItem" key={row.id}>
            <img src={img1} alt="" className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{`${row.firstName} ${row.lastName}`}</span>
              <span className="widgetSmUserTitle">{row.interest}</span>
            </div>
            <button
              className="widgetSmButton"
              onClick={() => {
                console.log(row);
              }}
            >
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
