export const formatYear = (dateString: string): string => {
    return dateString ? new Date(dateString).getFullYear().toString() : "N/A";
};

export const formatRating = (rating: number): string => {
    return rating && rating > 0 ? rating.toFixed(1) : "N/A";
};
