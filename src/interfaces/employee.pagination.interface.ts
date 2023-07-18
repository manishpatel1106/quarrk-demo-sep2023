interface IPagination {
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    nextPage: number,
    previousPage: number,
    lastPage: number
}