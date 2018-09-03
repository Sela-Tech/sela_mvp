import React from "react";
import { button } from "styled-components";
// import Spinner from "../../assets/spinner.svg";
import Spinner from "../spinners";

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
        disabled={attempt}
      >
        {attempt === true ? (
          <Spinner type="two" />
        ) : (
          // <img src={Spinner} alt="spinner" height="15px" />
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
