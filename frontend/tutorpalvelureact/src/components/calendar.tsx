import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  DateSelectArg,
  EventInput,
  DateSpanApi,
} from "@fullcalendar/core";
import fiLocale from "@fullcalendar/core/locales/fi";
import { useEffect, useState } from "react";
import "../styles.css";

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<DateSelectArg | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // Sallitaan vain 1-3 tunnin varaukset
  const selectAllow = (info: DateSpanApi) => {
    const start = new Date(info.startStr);
    const end = new Date(info.endStr);

    const durationMs = end.getTime() - start.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);

    return durationHours >= 1 && durationHours <= 3;
  };

  const handleSelect = (info: DateSelectArg) => {
    setSelectedSlot(info);
  };

  const saveBooking = async () => {
    if (!selectedSlot) return;

    const newBooking = {
      title,
      start: selectedSlot.startStr,
      end: selectedSlot.endStr,
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
    setSelectedSlot(null);
    setTitle("");
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locales={[fiLocale]}
        locale="fi"
        firstDay={1}
        selectable={!selectedSlot}
        selectAllow={selectAllow}
        select={handleSelect}
        events={events}
        height="100%"
        expandRows={true}
        allDaySlot={false}
        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        // Valinnat tunnin välein
        slotDuration="01:00:00"
        snapDuration="01:00:00"
        businessHours={{
          startTime: "07:00",
          endTime: "21:00",
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        buttonText={{
          today: "Tänään",
          week: "Viikko",
          day: "Päivä",
        }}
      />

      {selectedSlot && (
        <div className="modal">
          <div className="modal-content">
            <h3>Tee ajanvaraus</h3>

            <p>
              {new Date(selectedSlot.startStr).toLocaleDateString("fi-FI", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              ·{" "}
              {new Date(selectedSlot.startStr).toLocaleTimeString("fi-FI", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              –{" "}
              {new Date(selectedSlot.endStr).toLocaleTimeString("fi-FI", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <input
              className="modal-input"
              type="text"
              placeholder="Varauksen otsikko"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="modal-buttons">
              <button className="modal-btn-save" onClick={saveBooking}>
                Tallenna
              </button>
              <button
                className="modal-btn-cancel"
                onClick={() => setSelectedSlot(null)}
              >
                Peruuta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
