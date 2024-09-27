"use client";
import "./Calendar.style.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import calendarIcon from "@/assets/calendar.svg";
import DatePicker from "@/app/(main)/components/DatePicker";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    setCurrentDate(formatDate(new Date()));
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setCurrentDate(formatDate(newDate));
  };

  const handleConfirm = () => {
    setShowCalendar(false);
  };

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  return (
    <div className='calendar'>
      <p>تاريخ الحجز</p>
      <div className='theDate' onClick={toggleCalendar}>
        <Image
          src={calendarIcon}
          alt="Calendar Icon"
          width={30}
          height={30}
          className='calendarIcon'
        />
        {currentDate}
      </div>

      {showCalendar && (
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
