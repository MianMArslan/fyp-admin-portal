import "./widgetLg.css";
import tz from "moment-timezone";

export default function WidgetLg(props) {
  const { rows } = props;
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">New Created Ads</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Destination</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {rows.map((row) => (
          <tr className="widgetLgTr" key={row.id}>
            <td className="widgetLgUser">
              <img src={row.imageUrl} alt="" className="widgetLgImg" />
              <span className="widgetLgName">{row.destination}</span>
            </td>
            <td className="widgetLgDate">
              {tz(row.createdAt).format("MMM Do YY")}
            </td>
            <td className="widgetLgAmount">{row.amount} Rs</td>
            <td className="widgetLgStatus">
              <Button type="Active" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
