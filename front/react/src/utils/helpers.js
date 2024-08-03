export const isInToday = (inputDate) => {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) === inputDate.setHours(0, 0, 0, 0);
};

export const isInYesterday = (inputDate) => {
    const yestDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return yestDay.setHours(0, 0, 0, 0) === inputDate.setHours(0, 0, 0, 0);
};