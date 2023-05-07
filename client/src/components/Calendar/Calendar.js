import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar";


const localizer = momentLocalizer(moment);

const MyCalendar = ({holidays}) => {
  const events = holidays.map(holiday => ({
    title:`${holiday.employeeName} - ${holiday.reason}`,
    start: new Date(holiday.startDate),
    end: new Date(holiday.endDate),
    allDay: true
  }));

  return (
    <div style={{height:500}}>
      <BigCalendar 
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{height: 500, width: '100%'}}
      />
    </div>
  );
};

export default MyCalendar;

// export default function Calendar(props) {
//   return <BigCalendar {...props} localizer={localizer} />;
// }