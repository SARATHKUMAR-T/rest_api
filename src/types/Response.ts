// Define a generic interface for API response
export interface ApiResponse<T> {
  isError: boolean;
  message?: string;
  data?: T;
}
