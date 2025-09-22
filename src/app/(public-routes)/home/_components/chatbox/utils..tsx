import React from "react";

export const formatMessage = (message: string) => {
  return message
    .replace(/\t/g, "\u00A0\u00A0\u00A0\u00A0")
    .split("\n")
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
};
