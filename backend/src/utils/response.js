/**
 * Success response format
 */
const successResponse = (data = null, pagination = null, message = 'Success') => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
};

/**
 * Error response format
 */
const errorResponse = (message = 'Error', errors = null, statusCode = 500) => {
  const response = {
    success: false,
    message,
    statusCode,
  };

  if (errors && Array.isArray(errors) && errors.length > 0) {
    response.errors = errors;
  }

  return response;
};

/**
 * Paginated response format
 */
const paginatedResponse = (data, page, limit, total) => {
  return {
    success: true,
    data,
    pagination: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
      total_pages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
};
