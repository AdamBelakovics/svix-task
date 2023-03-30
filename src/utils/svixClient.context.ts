import React, { useContext } from "react";
import { Svix } from "svix";

export const SvixClientContext = React.createContext(
  new Svix(process.env.REACT_APP_SVIX_API_KEY as string)
);

export const useSvixClient = () => {
  const svixClient = useContext(SvixClientContext);
  return svixClient;
};
