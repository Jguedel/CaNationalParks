import axios from "axios";
import { createContext } from "react";
export const parkData = createContext(
  await axios.get(
    `https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=gbBZeILeC6tbSpjQpijLZDcEoYWYT9rOkMkgyjgQ`
  )
);
