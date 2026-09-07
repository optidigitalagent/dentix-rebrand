import assert from "node:assert/strict";
import test from "node:test";
import { isExactMapping, bookingModeLabel } from "../src/lib/booking-modes.ts";
import type { BookingMapping } from "../src/lib/booking-types.ts";
const direct: BookingMapping = { doctor_id: "doctor", service_id: "interest", active: true, public_bookable: true, booking_mode: "DIRECT_SLOT", reservation_duration_minutes: 150, buffer_before_minutes: 0, buffer_after_minutes: 0, consultation_service_id: null, scheduled_service_id: "interest", scheduled_service_name: "Прийом" };
test("exact-time eligibility needs an explicit active mapping and finite positive duration", () => {
  assert.equal(isExactMapping(direct), true);
  for (const duration of [null, 0, -30, 1.5, NaN]) assert.equal(isExactMapping({ ...direct, reservation_duration_minutes: duration }), false);
  assert.equal(isExactMapping({ ...direct, active: false }), false);
  assert.equal(isExactMapping({ ...direct, public_bookable: false }), false);
  assert.equal(isExactMapping({ ...direct, scheduled_service_id: null }), false);
  assert.equal(isExactMapping({ ...direct, booking_mode: "CALLBACK_ONLY" }), false);
});
test("a treatment interest cannot silently turn into a direct procedure when consultation is missing", () => {
  assert.equal(isExactMapping({ ...direct, booking_mode: "CONSULTATION_SLOT" }), false);
  assert.equal(isExactMapping({ ...direct, booking_mode: "CONSULTATION_SLOT", consultation_service_id: "consultation", scheduled_service_id: "consultation" }), true);
  assert.match(bookingModeLabel("CONSULTATION_SLOT"), /консультацію/);
  assert.match(bookingModeLabel("CALLBACK_ONLY"), /без вибору часу/);
});
