import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { api } from "../services/api";
import type {
  DateSelectArg,
  EventInput,
  EventClickArg,
  DateSpanApi,
} from "@fullcalendar/core";
import fiLocale from "@fullcalendar/core/locales/fi";
import { useEffect, useState } from "react";
import "../styles.css";

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<DateSelectArg | null>(null);
  const [title, setTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(
    null,
  );

  useEffect(() => {
    api.get("/api/appointments").then((res) => {
      console.log("API events:", res.data);

      setEvents(
        res.data.map((e: any) => ({
          id: String(e.id),
          title: e.title,
          start: e.start,
          end: e.end,
        })),
      );
    });
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

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo);
    setSelectedSlot(null); // Vältetään päällekkäisyyttä varaus- ja tapahtumanäkymän välillä
  };

  const saveBooking = async () => {
    if (!selectedSlot) return;

    const newBooking = {
      title,
      start: selectedSlot.startStr,
      end: selectedSlot.endStr,
    };

    try {
      const res = await api.post("/api/appointments", newBooking);

      setEvents((prev) => [
        ...prev,
        {
          id: String(res.data.id),
          title: res.data.title,
          start: res.data.start,
          end: res.data.end,
        },
      ]);
      setSelectedSlot(null);
      setTitle("");
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  const deleteBooking = async () => {
    if (!selectedEvent) return;

    const id = selectedEvent.event.id;

    try {
      await api.delete(`/api/appointments/${id}`);

      setEvents((prev) => prev.filter((e) => e.id !== id));
      setSelectedEvent(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locales={[fiLocale]}
        locale="fi"
        firstDay={1}
        selectable={!selectedSlot && !selectedEvent}
        selectAllow={selectAllow}
        select={handleSelect}
        events={events}
        eventClick={handleEventClick}
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

      {(selectedSlot || selectedEvent) && (
        <div className="modal">
          <div className="modal-content">
            {/* LUO AJANVARAUS */}
            {selectedSlot && (
              <>
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
              </>
            )}

            {/* POISTA VARAUS */}
            {selectedEvent && (
              <>
                <h3>Varaus</h3>

                <p>
                  <strong>{selectedEvent.event.title}</strong>
                </p>

                <p>
                  {selectedEvent.event.start?.toLocaleDateString("fi-FI", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  ·{" "}
                  {selectedEvent.event.start?.toLocaleTimeString("fi-FI", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {selectedEvent.event.end?.toLocaleTimeString("fi-FI", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <div className="modal-buttons">
                  <button className="modal-btn-delete" onClick={deleteBooking}>
                    Poista
                  </button>
                  <button
                    className="modal-btn-cancel"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Sulje
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
