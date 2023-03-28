const rangeClosed = (min, max) => {
    const result = [];
    for (let i = min; i <= max; i++) {
        result.push(i);
    }
    return result;
};
export const paginatedPages = (currentPage, pageCount, maxVisibleCount) => {
    if (pageCount <= 1) {
        return [[1]];
    }
    if (pageCount <= maxVisibleCount) {
        return [rangeClosed(1, pageCount)];
    }
    const halfVisibleCount = maxVisibleCount / 2;
    if (currentPage < halfVisibleCount + 1) {
        return [rangeClosed(1, maxVisibleCount - 2), [pageCount]];
    }
    if (currentPage >= pageCount - halfVisibleCount) {
        return [[1], rangeClosed(pageCount - maxVisibleCount + 3, pageCount)];
    }
    return [[1], rangeClosed(currentPage - Math.ceil(halfVisibleCount) + 3, currentPage + Math.floor(halfVisibleCount) - 2), [pageCount]];
};
