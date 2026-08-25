import type {
  AvailabilityDay,
  BookingCatalog,
  BookingConfirmation,
  CreateBookingInput,
} from "./booking-types";
import { BookingApiError } from "./booking-types";
import { bookingEndpoint, resolveBookingConfig } from "./booking-config";

const config = resolveBookingConfig({
  VITE_DENTIX_BOOKING_API_URL: import.meta.env["VITE_DENTIX_BOOKING_API_URL"],
  VITE_DENTIX_BOOKING_ENABLED: import.meta.env["VITE_DENTIX_BOOKING_ENABLED"],
});

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(bookingEndpoint(config, path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  const payload = (await response.json().catch(() => ({}))) as {
    data?: T;
    error?: { code?: string; message?: string };
  };
  if (!response.ok || !payload.data) {
    throw new BookingApiError(
      payload.error?.code ?? "BOOKING_API_ERROR",
      payload.error?.message ?? "Не вдалося виконати запит. Спробуйте ще раз.",
      response.status,
    );
  }
  return payload.data;
}

export const bookingClient = {
  enabled: config.enabled,
  mode: config.enabled ? ("production" as const) : ("disabled" as const),
  getCatalog: () => request<BookingCatalog>("/catalog"),
  getAvailability: (serviceId: string, doctorId: string) =>
    request<AvailabilityDay[]>(
      `/availability?serviceId=${encodeURIComponent(serviceId)}&doctorId=${encodeURIComponent(doctorId)}`,
    ),
  createAppointment: (input: CreateBookingInput) =>
    request<BookingConfirmation>("/appointments", {
      method: "POST",
      body: JSON.stringify(input),
    }),
};
