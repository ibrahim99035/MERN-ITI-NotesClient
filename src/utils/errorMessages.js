export const ERROR_MESSAGES = {
  400: { title: "Invalid request", message: "Something about this request isn't right. Please check your input." },
  401: { title: "Session expired", message: "Please log in again to continue." },
  403: { title: "Access denied", message: "You don't have permission to do this." },
  404: { title: "Not found", message: "We couldn't find what you're looking for." },
  409: { title: "Conflict", message: "This already exists or conflicts with existing data." },
  422: { title: "Validation error", message: "Please check the highlighted fields." },
  429: { title: "Too many requests", message: "Slow down a bit and try again shortly." },
  500: { title: "Server error", message: "Something went wrong on our end. Please try again." },
  502: { title: "Server unavailable", message: "The server is temporarily unreachable." },
  503: { title: "Service unavailable", message: "The service is temporarily down for maintenance." },
  504: { title: "Timeout", message: "The server took too long to respond." },
  default: { title: "Unexpected error", message: "Something went wrong. Please try again." },
};

export const getErrorInfo = (status) => ERROR_MESSAGES[status] || ERROR_MESSAGES.default;
