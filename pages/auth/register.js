import React, { useState } from "react";
import { unauthPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}
export default function Register() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  async function registerHandler(e) {
    e.preventDefault();
    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    if (!registerReq.ok) return setStatus("error" + registerReq.status);
    const registerRes = await registerReq.json();
    setStatus("success");
  }
  function fieldHandler(e) {
    const name = e.target.getAttribute("name");
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerHandler.bind(this)}>
        <input
          type="email"
          name="email"
          onChange={fieldHandler.bind(this)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={fieldHandler.bind(this)}
          placeholder="Password"
        />
        <br />
        <button type="submit">Register</button>
        <div>Info: {status}</div>
      </form>
    </div>
  );
}
