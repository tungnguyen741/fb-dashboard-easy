declare module "*.svg?url" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "react/jsx-runtime" {
  const content: string;
  export default content;
}

declare module "my" {
  global {
    interface FB {}
  }
}

declare namespace FB {
  function ui(...arg: any[]): any;
  function getLoginStatus(...arg: any[]): any;
  function login(...arg: any[]): any;
  function api(...arg: any[]): any;
  function logout(...arg: any[]): any;
}
