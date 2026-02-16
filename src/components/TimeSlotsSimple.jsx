import { useTranslation } from "react-i18next";

/**
 * TimeSlotsDynamic
 * @param {string} value - выбранное время
 * @param {function} onChange - функция для обновления выбранного времени
 * @param {Array<string>} disabledSlots - массив занятых/недоступных слотов, например ['10:30', '14:00']
 * @param {string} start - время начала, формат 'HH:mm' (по умолчанию '09:00')
 * @param {string} end - время окончания, формат 'HH:mm' (по умолчанию '17:00')
 * @param {number} interval - интервал в минутах (по умолчанию 30)
 */
export const TimeSlotsDynamic = ({
  value,
  onChange,
  disabledSlots = [],
  start = "09:00",
  end = "17:00",
  interval = 30,
}) => {
  const { t } = useTranslation();

  // Генерация временных слотов
  const generateSlots = () => {
    const slots = [];
    let [hour, minute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push(time);
      minute += interval;
      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }
    }
    return slots;
  };

  const timeSlots = generateSlots();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    >
      <option value="">{t("booking.selectTime")}</option>
      {timeSlots.map((time) => (
        <option key={time} value={time} disabled={disabledSlots.includes(time)}>
          {time}{" "}
          {disabledSlots.includes(time) ? `(${t("booking.unavailable")})` : ""}
        </option>
      ))}
    </select>
  );
};
