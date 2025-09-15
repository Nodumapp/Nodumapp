import { useEffect, useState } from "react";

export default function useFacebookSDK(appId) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!appId) return;
    if (window.FB) { setReady(true); return; }

    window.fbAsyncInit = function () {
      window.FB.init({ appId, cookie: true, xfbml: false, version: "v20.0" });
      setReady(true);
    };

    if (!document.getElementById("facebook-jssdk")) {
      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/es_LA/sdk.js";
      document.body.appendChild(js);
    }
  }, [appId]);

  return ready;
}
