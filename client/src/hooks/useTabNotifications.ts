import { useEffect, useRef } from "react";

type Params = {
  isPageVisible: boolean;
  faviconActive?: string;
  faviconDefault?: string;
  titleDefault?: string;
};

/**
 * useTabNotifications
 *
 * This hook manages browser tab notifications when the user is not actively viewing the page.
 *
 * Features:
 * - Increments a notification counter when new events arrive while the tab is inactive
 * - Updates document.title to reflect the number of unread notifications
 * - Switches the favicon (tab icon) when there are new notifications
 * - Resets title, favicon, and counter when the user returns to the tab
 
 */

export const useTabNotifications = ({
  isPageVisible,
  faviconActive = "/red-envelope.png",
  faviconDefault = "/vite.svg",
  titleDefault = "Chat App",
}: Params) => {
  const tabNotificationCountRef = useRef(0);

  const setFavicon = (href: string) => {
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

    if (link) {
      link.href = href;
    }
  };

  useEffect(() => {
    if (isPageVisible) {
      tabNotificationCountRef.current = 0;
      document.title = titleDefault;
      setFavicon(faviconDefault);
    }
  }, [isPageVisible, faviconDefault, titleDefault]);

  const notify = () => {
    if (isPageVisible) return;

    tabNotificationCountRef.current += 1;
    document.title = `(${tabNotificationCountRef.current}) New message`;
    setFavicon(faviconActive);
  };

  return { notify };
};
