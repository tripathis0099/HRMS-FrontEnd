import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const LeaveCalendar = ({ leaves = [] }) => {
  /*  Build a quick date‑>count lookup so we know which tiles to decorate  */
  const dateCounts = useMemo(() => {
    const map = {};
    leaves.forEach(lv => {
      const key = new Date(lv.leaveDate).toDateString();   // one key per day
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }, [leaves]);

  /*  Adds the purple square around any day that has at least one leave  */
  const tileClassName = ({ date, view }) =>
    view === 'month' && dateCounts[date.toDateString()] ? 'leave-day' : undefined;

  /*  Puts the little round badge with the # of leaves on that day  */
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const count = dateCounts[date.toDateString()];
    return count ? <div className="leave-badge">{count}</div> : null;
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

      {/* APPROVED LEAVES LIST — just like in your screenshot */}
      <div className="approved-block">
        <h4>Approved Leaves</h4>
        {leaves
          .filter(lv => lv.status === 'Approved')
          .map(lv => (
            <div className="approved-item" key={lv._id}>
              <div>
                <div className="name">{lv.employeeId?.name}</div>
                <div className="date">
                  {new Date(lv.leaveDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeaveCalendar;
