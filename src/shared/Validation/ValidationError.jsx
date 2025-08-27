import React from "react";

function ValidationError({ error }) {
  return (
    <>
      <p className="text-red-700">{error}</p>
    </>
  );
}

export default ValidationError;
