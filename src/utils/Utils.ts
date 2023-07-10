export const toHoursAndMinutes = (totalMinutes: number) => {
    if(isNaN(totalMinutes)) return null
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};