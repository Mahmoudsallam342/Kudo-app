import { Button, Spinner } from "flowbite-react";
import React from "react";

function ButtonApp({ children, isLoading, disabled, ...props }) {
  return (
    <>
      <Button type="submit" disabled={disabled} {...props}>
        {isLoading && (
          <Spinner
            aria-label="Alternate spinner button example "
            size="sm"
            className="me-3"
            light
          />
        )}
        {children}
      </Button>
    </>
  );
}

export default ButtonApp;
