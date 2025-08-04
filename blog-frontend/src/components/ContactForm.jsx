// src/components/ContactForm.jsx
import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault(); 
    setSubmitting(true);
    setResult("");
    try {
      const res = await fetch("https://formspree.io/f/mrblajdn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setResult("Message sent successfully!");
        setForm({ name: "", email: "", message: "" }); // Temizle
      } else {
        setResult("Failed to send. Try again.");
      }
    } catch {
      setResult("Network error.");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <input
        name="name"
        type="text"
        placeholder="First Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 12, padding: 8 }}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 12, padding: 8 }}
      />
      <textarea
        name="message"
        placeholder="Message..."
        value={form.message}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 12, padding: 8, minHeight: 80 }}
      />
      <button
        type="submit"
        disabled={submitting}
        style={{
          width: "100%",
          background: "#FFD600",
          color: "#222",
          fontWeight: "bold",
          padding: "10px 0",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        {submitting ? "Sending..." : "Submit"}
      </button>
      {result && (
        <div style={{ marginTop: 16, textAlign: "center", color: "#00b300" }}>
          {result}
        </div>
      )}
    </form>
  );
}
