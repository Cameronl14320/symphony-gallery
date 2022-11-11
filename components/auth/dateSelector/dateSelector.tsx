import styles from "./dateSelector.module.scss";
import {useEffect, useState} from "react";

const days = []

export const DateSelector = () => {
    const [loading, setLoading] = useState(false);
    const [latestDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(latestDate.getDay());
    const [selectedMonth, setSelectedMonth] = useState(latestDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(latestDate.getFullYear());
    const [validDays, setValidDays] = useState(new Date(selectedMonth, selectedYear, 0).getDate());

    useEffect(() => {
        console.log(selectedMonth + " : " + selectedYear)
        const date = new Date(selectedMonth, selectedYear, 0).getDate();
        console.log(date);
        setValidDays(date);
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        console.log(validDays);
        if (selectedDay > validDays) {
            setSelectedDay(validDays);
        }
    }, [validDays]);

    const days: any[] = [];
    for (let i = 0; i < validDays; i++) {
        days.push(
            <option key={"day-" + (i + 1)} value={i + 1}>{i + 1}</option>
        );
    }

    const handleYearChange = (year: number) => {
        setLoading(true);
        setSelectedYear(year);
    }

    const handleMonthChange = (month: number) => {
        setLoading(true);
        setSelectedMonth(month);
    }

    const validMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const months = validMonths.map((month, index) => <option key={"month-" + month} value={index}>{month}</option>)

    const years = [];
    for (let i = 0; i < 100; i++) {
        years.push(
          <option key={"year-" + (latestDate.getFullYear() - i)} value={latestDate.getFullYear() - i}>{latestDate.getFullYear() - i}</option>
        );
    }

    return (
      <div className={styles.container}>
          <select name="day" id="day" value={selectedDay} onChange={(event) => setSelectedDay(Number.parseInt(event.target.value))}>
              {days}
          </select>
          <select name="month" id="month" value={selectedMonth} onChange={(event) => setSelectedMonth(Number.parseInt(event.target.value))}>
              {months}
          </select>
          <select name="year" id="year" value={selectedYear} onChange={(event) => setSelectedYear(Number.parseInt(event.target.value))}>
              {years}
          </select>
      </div>
    );
}

export default DateSelector;
