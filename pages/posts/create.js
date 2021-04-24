import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);
  return {
    props: {
      token,
    },
  };
}
export default function PostCreate(props) {
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });
  const [status, setStatus] = useState("normal");
  async function createHandler(e) {
    e.preventDefault();
    const { token } = props;
    const create = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });
    if (!create.ok) return setStatus("Error");
    const res = await create.json();
    setStatus("Success");
    Router.push("/posts");
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
      <h1>Create a Post</h1>
      <form onSubmit={createHandler.bind(this)}>
        <input
          type="text"
          onChange={fieldHandler.bind(this)}
          placeholder="Title here"
          name="title"
        />
        <br />
        <textarea
          name="content"
          onChange={fieldHandler.bind(this)}
          placeholder="content here"></textarea>
        <br />
        <div>status: {status} </div>
        <button type="submit">Creat a Post</button>
      </form>
    </div>
  );
}
