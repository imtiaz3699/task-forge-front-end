export const generatePageRange = (currentPage, totalPages, visiblePages = 5) => {
    const currentBlock = Math.floor((currentPage - 1) / visiblePages);
    console.log(currentPage,totalPages,currentBlock,'fasdlfjhalsdkj')
    const start = (currentBlock * visiblePages) + 1;
    const end = Math.min((start + visiblePages) - 1, totalPages);
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
};