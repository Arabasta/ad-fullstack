export const formatTimestamp = (timestamp) => {
    const date = new Date(
        timestamp.substring(0, 4), // year
        timestamp.substring(4, 6) - 1, // month (0-indexed)
        timestamp.substring(6, 8), // day
        timestamp.substring(8, 10), // hour
        timestamp.substring(10, 12), // minute
        timestamp.substring(12, 14) // second
    );
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
};
