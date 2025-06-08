export const formatYear = (dateString: string): string => {
    return dateString ? new Date(dateString).getFullYear().toString() : "N/A";
};

export const formatRating = (rating: number): string => {
    return rating && rating > 0 ? rating.toFixed(1) : "N/A";
};

export const formatRuntime = (minutes: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};
