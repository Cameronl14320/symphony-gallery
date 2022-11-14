import styles from "./dateSelector.module.scss";
import {useEffect, useState} from "react";

const YEAR_RANGE = 130;
const VALID_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const DateSelector = (props: {onChange?: (selectedDate: Date) => void}) => {
    const [loading, setLoading] = useState(false);
    const [latestDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(latestDate.getDay());
    const [selectedMonth, setSelectedMonth] = useState(latestDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(latestDate.getFullYear());
    const [validDays, setValidDays] = useState(new Date(selectedMonth, selectedYear, 0).getDate());
    const { onChange } = props;

    useEffect(() => {
        if (selectedDay > validDays) {
            setSelectedDay(validDays);
        }
        setLoading(false);
    }, [validDays]);

    useEffect(() => {
        const date = new Date(selectedYear, selectedMonth, 0).getDate();
        if (date != validDays) {
            setValidDays(date);
        } else {
            setLoading(false);
        }
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        if (!!onChange) {
            onChange(new Date(selectedYear, selectedMonth, selectedDay));
        }
    }, [selectedDay, selectedMonth, selectedYear])

    const handleYearChange = (year: number) => {
        setLoading(true);
        setSelectedYear(year);
    }

    const handleMonthChange = (month: number) => {
        setLoading(true);
        setSelectedMonth(month);
    }

    // Generate the drop-down options for date selection
    const days = generateDays(validDays);
    const months = VALID_MONTHS.map((month, index) => <option key={"month-" + month} value={index + 1}>{month}</option>)
    const years = generateYears(latestDate.getFullYear());

    return (
      <div className={styles.container}>
          <select name="day" id="day" value={selectedDay} onChange={(event) => setSelectedDay(Number.parseInt(event.target.value))} disabled={loading}>
              {days}
          </select>
          <select name="month" id="month" value={selectedMonth} onChange={(event) => handleMonthChange(Number.parseInt(event.target.value))} disabled={loading}>
              {months}
          </select>
          <select name="year" id="year" value={selectedYear} onChange={(event) => handleYearChange(Number.parseInt(event.target.value))} disabled={loading}>
              {years}
          </select>
      </div>
    );
}

const generateDays = (maxDays: number) => {
    const days: any[] = [];
    for (let i = 0; i < maxDays; i++) {
        days.push(
            <option key={"day-" + (i + 1)} value={i + 1}>{i + 1}</option>
        );
    }

    return days;
}

const generateYears = (currentYear: number) => {
    const years: any[] = [];
    for (let i = 0; i < YEAR_RANGE; i++) {
        years.push(
            <option key={"year-" + (currentYear - i)} value={currentYear - i}>{currentYear - i}</option>
        );
    }

    return years;
}

export default DateSelector;
