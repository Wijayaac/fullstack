import React, { useState } from "react";
import Cookie from "js-cookie";

export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");
  async function loginHandler(e) {
    e.preventDefault();
    setStatus("loading");
    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus("error" + loginReq.status);
    const loginRes = await loginReq.json();
    setStatus("success");
    Cookie.set("token", loginRes.token);
  }
  function fieldHandler(e) {
    const name = e.target.getAttribute("name");
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }
  return (
    <div className="">
      <h1>Login</h1>
      <form onSubmit={loginHandler.bind(this)}>
        <input
          type="email"
          onChange={fieldHandler.bind(this)}
          name="email"
          placeholder="email"
        />
        <input
          type="password"
          onChange={fieldHandler.bind(this)}
          name="password"
        />
        <button type="submit">Login</button>
        <div>Info :{status} </div>
      </form>
    </div>
  );
}
