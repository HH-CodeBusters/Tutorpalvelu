import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateSelectArg, EventInput } from "@fullcalendar/core";
import { useEffect, useState } from "react";
import "../styles.css";
export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleSelect = async (info: DateSelectArg) => {
    const newBooking = {
      start: info.startStr,
      end: info.endStr,
    };

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    });

    const saved = await res.json();

    setEvents([...events, saved]);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        events={events}
        select={handleSelect}
      />
    </div>
  );
}
