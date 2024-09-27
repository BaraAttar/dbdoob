import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/ar";

import "./style/DatePicker.style.css";

// Hijri date
import { toHijri } from "hijri-date/lib/safe";

export default function DatePicker({
  selectedDate,
  onDateChange,
  onConfirm,
}) {
  const [tempDate, setTempDate] = useState(dayjs(selectedDate).toDate());
  const [hijriDate, setHijriDate] = useState(toHijri(tempDate));

  const today = dayjs().locale("ar").startOf("day");
  const maxSelectableYear = dayjs().add(2, "year").year();

  // Handle date changes from the calendar
  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = date.toDate();
      setTempDate(selectedDate);

      const hijriDate = toHijri(selectedDate);
      setHijriDate(hijriDate);
    }
  };

  const handleConfirm = () => {
    onDateChange(tempDate);
    onConfirm();
  };

  // Format the selected date for display
  const displayDate = dayjs(tempDate).locale("ar").format("DD-MM-YYYY");

  // Format the Hijri date for display
  const displayHijriDate = hijriDate
    ? `${hijriDate._date}-${hijriDate._month}-${hijriDate._year} هـ`
    : "N/A";

  const shouldDisableDate = (date) => {
    return dayjs(date).year() > maxSelectableYear;
  };

  return (
    <div className={`date-component`}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ar" // هنا نحدد اللغة للمحول
      >
        <DateCalendar
          className="custom-calendar"
          date={dayjs(tempDate).locale("ar")}
          onChange={handleDateChange}
          minDate={today}
          shouldDisableDate={shouldDisableDate}
        />
      </LocalizationProvider>
      <p>التاريخ المحدد: {displayDate}</p>
      <p>الموافق: {displayHijriDate}</p>
      <button className="confirm-button" onClick={handleConfirm}>
        موافق
      </button>
    </div>
  );
}
