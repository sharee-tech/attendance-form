import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, useState } from "react";

export default function Hcaptcha({ ref, sitekey, onVerify }) {
  const [captchaToken, setCaptchaToken] = useState();
  const captchaRef = useRef();

  return (
    <>
      <HCaptcha
        ref={captchaRef}
        sitekey={process.env.REACT_APP_HCAPTCHA_SITEKEY}
        onVerify={(token) => {
          setCaptchaToken(token);
        }}
      />
    </>
  );
}
