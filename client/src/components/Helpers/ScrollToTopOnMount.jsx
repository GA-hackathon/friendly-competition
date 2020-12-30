import { useEffect } from "react";
// https://reactrouter.com/web/guides/scroll-restoration
// it ruins the user experience when you open a new page and it doesn't scroll back to the top, this handles that.
export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // returning null because I just want the useEffect, nothing else rendered.
  return null;
}
