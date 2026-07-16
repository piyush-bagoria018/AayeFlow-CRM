"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { countries, industries, companySizes } from "@/data/formOptions";
import { validateInquiry } from "@/utils/validateInquiry";
import { createInquiry } from "@/services/inquiry.service";

const initialValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  companySize: "",
  message: "",
};

export function InquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateInquiry(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      await createInquiry(values);
      setStatus("success");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setServerError(error.message);
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/20">
          <svg
            className="h-6 w-6 text-success"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>

        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
          Thanks, we have your details
        </h3>
        <p className="mt-2 text-sm text-muted">
          Our sales team will get back to you within one business day.
        </p>

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Piyush Bagoria"
          required
        />
        <Input
          label="Company Name"
          name="companyName"
          value={values.companyName}
          onChange={handleChange}
          error={errors.companyName}
          placeholder="Nimbus Retail"
          required
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@company.com"
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+91 98765 43210"
          required
        />
        <Select
          label="Country"
          name="country"
          value={values.country}
          onChange={handleChange}
          error={errors.country}
          options={countries}
          placeholder="Select a country"
          required
        />
        <Select
          label="Industry"
          name="industry"
          value={values.industry}
          onChange={handleChange}
          error={errors.industry}
          options={industries}
          placeholder="Select an industry"
          required
        />
        <div className="sm:col-span-2">
          <Select
            label="Company Size"
            name="companySize"
            value={values.companySize}
            onChange={handleChange}
            error={errors.companySize}
            options={companySizes}
            placeholder="Select company size"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Message"
            name="message"
            value={values.message}
            onChange={handleChange}
            error={errors.message}
            placeholder="Tell us about your team and what you are looking for."
            rows={5}
            required
          />
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-5 rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send inquiry"}
        </Button>
        <p className="text-xs text-muted">
          We reply within one business day. No spam, ever.
        </p>
      </div>
    </form>
  );
}
