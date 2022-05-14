import React, {useEffect} from "react";
import {SnackbarProvider} from "notistack";
import {useLocation} from "react-router-dom";

const Container: React.FC<{ children: any }> = ({children}) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (process.env.NODE_ENV === 'production') {
      // @ts-ignore
      // window.gtag('config', `G-12FES5S4E5`, {
      //   page_title: location.pathname,
      //   page_location: window?.location.href,
      //   page_path: location.pathname,
      // });
    }

  }, [location]);

  return (
    <SnackbarProvider>
      {children}
    </SnackbarProvider>
  )
};

export default Container;
