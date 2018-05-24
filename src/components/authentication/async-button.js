import React from "react";
import { button } from "styled-components";
import Spinner from "../../assets/spinner.svg";

export default ({
  attempt,
  className,
  onClick,
  onChangeFunction,
  children,
  id,
  type,
  disabled
}) => {
  if (disabled === false || disabled === undefined) {
    return (
      <button
        className={className}
        id={id}
        type={type || "submit"}
        disabled={attempt === "in-progress"}
      >
        {attempt === "in-progress" ? (
          <img src={Spinner} alt="spinner" height="15px" />
        ) : (
          children
        )}
      </button>
    );
  }

  return (
    <button
      className={className}
      id={id}
      type={type || "submit"}
      onChange={onChangeFunction}
      onClick={onClick}
      disabled={true}
    >
      {children}
    </button>
  );
};
