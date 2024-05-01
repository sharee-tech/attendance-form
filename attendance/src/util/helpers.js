export const formatSelectedDates = (allDates) => {
  const formattedDates = [];
  allDates.map((date) => {
    return formattedDates.push(
      date.year + "-" + date.month.number + "-" + date.day
    );
  });
  return formattedDates;
};

export const formatUserDates = (allDates) => {
  const formattedDates = [];
  allDates.map((date) => {
    return formattedDates.push(
      date.month.number + "-" + date.day + "-" + date.year
    );
  });
  return formattedDates;
};

export function getSortedOptions(members) {
  return [...members]
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    .map((member) => ({
      id: member.id,
      full_name: `${member.first_name} ${member.last_name}`,
      email: member.email,
    }));
}
