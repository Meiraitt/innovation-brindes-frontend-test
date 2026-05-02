export const formatCurrentDate = () => {
  const [weekday = "", date = ""] = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    weekday: "long",
    year: "numeric",
  })
    .format(new Date())
    .split(", ");
  const shortWeekday = weekday.split("-")[0];
  const capitalizedWeekday =
    shortWeekday.charAt(0).toUpperCase() + shortWeekday.slice(1);

  return `${capitalizedWeekday}, ${date}`;
};
