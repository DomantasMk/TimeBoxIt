import React from "react";

export default function TaskContainer({ task: { title, description, date } }) {
  return <div>{title}</div>;
}
