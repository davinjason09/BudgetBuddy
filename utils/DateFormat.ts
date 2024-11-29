export const formatDate = (date: Date | null) => {
  if (!date) return "";

  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}/${String(date.getFullYear())}`;
};

export const formatDateToISO = (date: Date | null) => {
  if (!date) return "";

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

export const formatTime = (date: Date | null, locale: string) => {
  if (!date) return "";

  if (!Intl.DateTimeFormat.supportedLocalesOf([locale]).length) {
    locale = "en-US";
  }

  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDayDate = (date: Date | null) => {
  if (!date) return "";

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatBasedOnDate = (date: Date | null, currentDate: Date) => {
  if (!date) return "";

  const diff = currentDate.getDate() - date.getDate();
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const daysInAMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};
