export function paginate(page, size) {
  let currentPage = Number(page);
  let pageSize = Number(size);

  if (!currentPage || currentPage <= 0) {
    currentPage = 1;
  }

  if (!pageSize || pageSize <= 0) {
    pageSize = 20;
  }

  const skip = (currentPage - 1) * pageSize;

  return {
    page: currentPage,
    limit: parseInt(pageSize, 10),
    skip: parseInt(skip, 10),
  };
}

