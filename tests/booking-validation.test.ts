import assert from "node:assert/strict";
import test from "node:test";
import { isPatientBookingDetailsValid } from "../src/lib/booking-validation.ts";

test("patient details require a meaningful name", () => {
  assert.equal(isPatientBookingDetailsValid({ name: "A", phone: "+380501112233", consent: true }), false);
});

test("patient details require a plausible phone and consent", () => {
  assert.equal(isPatientBookingDetailsValid({ name: "Анна", phone: "123", consent: true }), false);
  assert.equal(isPatientBookingDetailsValid({ name: "Анна", phone: "+380501112233", consent: false }), false);
});

test("patient details accept valid contact input", () => {
  assert.equal(isPatientBookingDetailsValid({ name: "Анна", phone: "+380 50 111 22 33", consent: true }), true);
});

test("ordinary Ukrainian names do not select the environment or require a prefix", () => {
  for (const name of ["Олена", "Іван Петренко", "Анна-Марія", "Мар’ян"]) {
    assert.equal(isPatientBookingDetailsValid({ name, phone: "+380000000001", consent: true }), true);
  }
  assert.equal(isPatientBookingDetailsValid({ name: "А".repeat(121), phone: "+380000000001", consent: true }), false);
  assert.equal(isPatientBookingDetailsValid({ name: "Олена", phone: "1".repeat(16), consent: true }), false);
});
