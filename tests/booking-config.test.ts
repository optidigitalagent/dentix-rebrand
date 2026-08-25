import assert from "node:assert/strict";
import test from "node:test";
import { bookingEndpoint, resolveBookingConfig } from "../src/lib/booking-config.ts";
import { BookingApiError } from "../src/lib/booking-types.ts";

test("public booking is disabled by default", () => {
  assert.deepEqual(resolveBookingConfig({}), { apiUrl: "", enabled: false });
});

test("an API URL alone never enables production booking", () => {
  assert.equal(resolveBookingConfig({ VITE_DENTIX_BOOKING_API_URL: "https://api.example.test" }).enabled, false);
});

test("booking requires both the exact flag and API URL", () => {
  assert.deepEqual(resolveBookingConfig({
    VITE_DENTIX_BOOKING_API_URL: "https://api.example.test/functions/v1/",
    VITE_DENTIX_BOOKING_ENABLED: "true",
  }), { apiUrl: "https://api.example.test/functions/v1", enabled: true });
});

test("disabled booking fails before any browser request can be sent", () => {
  assert.throws(
    () => bookingEndpoint(resolveBookingConfig({}), "/booking-api/catalog"),
    (error) => error instanceof BookingApiError && error.code === "BOOKING_BACKEND_NOT_CONFIGURED" && error.status === 503,
  );
});

test("enabled booking resolves only against the configured public API", () => {
  const config = resolveBookingConfig({
    VITE_DENTIX_BOOKING_API_URL: "https://api.example.test/functions/v1",
    VITE_DENTIX_BOOKING_ENABLED: "true",
  });
  assert.equal(bookingEndpoint(config, "/booking-api/catalog"), "https://api.example.test/functions/v1/booking-api/catalog");
});
