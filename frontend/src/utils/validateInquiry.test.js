import { describe, it, expect } from "vitest";
import { validateInquiry } from "./validateInquiry";

// A submission where every field is correct. Each test starts from this
// and breaks one field, so we know the failure is caused by that field.
const validInquiry = {
  fullName: "Piyush Bagoria",
  companyName: "Nimbus Retail",
  email: "piyush@nimbusretail.in",
  phone: "+91 98765 43210",
  country: "India",
  industry: "Retail & E-commerce",
  companySize: "51-200",
  message: "We need a CRM for our sales team of 80 people.",
};

const emptyInquiry = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  companySize: "",
  message: "",
};

describe("validateInquiry", () => {
  it("returns no errors for a valid inquiry", () => {
    expect(validateInquiry(validInquiry)).toEqual({});
  });

  it("returns an error for all eight fields when the form is empty", () => {
    const errors = validateInquiry(emptyInquiry);
    expect(Object.keys(errors)).toHaveLength(8);
  });

  describe("fullName", () => {
    it("rejects a name that is only spaces", () => {
      const errors = validateInquiry({ ...validInquiry, fullName: "   " });
      expect(errors.fullName).toBe("Full name is required");
    });

    it("rejects a single character name", () => {
      const errors = validateInquiry({ ...validInquiry, fullName: "P" });
      expect(errors.fullName).toBe("Full name must be at least 2 characters");
    });

    it("rejects a name over 80 characters", () => {
      const errors = validateInquiry({ ...validInquiry, fullName: "a".repeat(81) });
      expect(errors.fullName).toBe("Full name cannot exceed 80 characters");
    });
  });

  describe("email", () => {
    it("rejects an address with no @", () => {
      const errors = validateInquiry({ ...validInquiry, email: "notanemail" });
      expect(errors.email).toBe("Please provide a valid email");
    });

    it("rejects an address with no domain", () => {
      const errors = validateInquiry({ ...validInquiry, email: "piyush@" });
      expect(errors.email).toBe("Please provide a valid email");
    });

    it("accepts a normal address", () => {
      const errors = validateInquiry({ ...validInquiry, email: "a.b-c@sub.domain.co" });
      expect(errors.email).toBeUndefined();
    });
  });

  describe("phone", () => {
    it("rejects letters", () => {
      const errors = validateInquiry({ ...validInquiry, phone: "abcdefgh" });
      expect(errors.phone).toBe("Please provide a valid phone number");
    });

    it("accepts a number with spaces and a country code", () => {
      const errors = validateInquiry({ ...validInquiry, phone: "+91 98765 43210" });
      expect(errors.phone).toBeUndefined();
    });
  });

  describe("dropdowns", () => {
    it("rejects an unselected country", () => {
      const errors = validateInquiry({ ...validInquiry, country: "" });
      expect(errors.country).toBe("Please select a country");
    });

    it("rejects an unselected company size", () => {
      const errors = validateInquiry({ ...validInquiry, companySize: "" });
      expect(errors.companySize).toBe("Please select a company size");
    });
  });

  describe("message", () => {
    it("rejects a message under 10 characters", () => {
      const errors = validateInquiry({ ...validInquiry, message: "hi" });
      expect(errors.message).toBe("Message must be at least 10 characters");
    });

    it("rejects a message over 1000 characters", () => {
      const errors = validateInquiry({ ...validInquiry, message: "a".repeat(1001) });
      expect(errors.message).toBe("Message cannot exceed 1000 characters");
    });
  });

  it("reports only the field that is wrong, not the others", () => {
    const errors = validateInquiry({ ...validInquiry, email: "bad" });
    expect(Object.keys(errors)).toEqual(["email"]);
  });
});
