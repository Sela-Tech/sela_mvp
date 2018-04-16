import React from 'react';
import Calendar from 'fullcalendar-reactwrapper';


export default function TimeLine (props){
    return <div className="col-md-8 col-sm-12 col-xs-12 p-t-24 p-8">
      <div className="card">
          <div className="card-content">
              {props.getDefaultDate() && <Calendar
               id = "timelineID"
               header = {{
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'month,basicWeek,basicDay'
                }}
                defaultView="basicWeek"
                themeSystem="bootstrap3"
                defaultDate={props.getDefaultDate()}
                navLinks= {true} // can click day/week names to navigate views
                editable= {false}
                eventLimit= {true} // allow "more" link when too many events
                events = {props.getMilestones()}
                />}                 
          </div>
      </div>
    </div>
};