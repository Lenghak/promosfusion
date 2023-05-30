"use client";

import { HtmlHTMLAttributes } from "react";

const Html = ({ children, ...props }: HtmlHTMLAttributes<HTMLHtmlElement>) => {
  return <html {...props}>{children}</html>;
};

export { Html };
