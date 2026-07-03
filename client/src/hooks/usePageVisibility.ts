import { useEffect, useState } from "react";
/**
 * usePageVisibility
 *
 * This hook tracks whether the current browser tab is visible or hidden.
 *
 * It uses the Page Visibility API to detect changes in document.visibilityState
 * and updates the state accordingly.
 *
 * Features:
 * - Returns `true` when the tab is visible (active)
 * - Returns `false` when the tab is hidden (user switched tabs or minimized browser)
 * - Automatically updates when visibility changes
 *
 * Commonly used for:
 * - pausing/resuming real-time updates
 * - managing notifications
 * - optimizing background activity in web applications
 */

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(() => {
    return document.visibilityState === "visible";
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
