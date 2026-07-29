import { Spin } from "antd";
import { useState, useEffect } from "react";

const messages = ["Loading...", "Getting there...", "Finalizing..."];

function Loader({ size = "large" }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (index >= messages.length - 1) {
      return;
    }

    const fadeOutTimer = setTimeout(() => {
      setFade(false);
    }, 5500);

    const swapTimer = setTimeout(() => {
      setIndex((prev) => Math.min(prev + 1, messages.length - 1));
      setFade(true);
    }, 6000); // reduced from 8000 to match fade timing (500ms transition)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(swapTimer);
    };
  }, [index]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 16px",
      }}
    >
      <Spin
        tip={
          <span
            style={{
              opacity: fade ? 1 : 0,
              transition: "opacity 500ms ease-in-out",
              display: "inline-block",
            }}
          >
            {messages[index]}
          </span>
        }
        size={size}
      />
    </div>
  );
}

export default Loader;
