import { ArrowIcon, CloseIcon, NotificationIcon } from "@icons/index";

export const NotificationsToggle = () => {
  return (
    <div className="flex items-center justify-between dark:bg-dark-3 py-5 px-3">
      <div className="flex items-center gap-3">
        <NotificationIcon className="dark:fill-blue-1 cursor-pointer" />
        <div>
          <span className="dark:text-dark-text-1">
            Get notified of new messages
          </span>
          <div>
            <div className="flex items-center">
              <span className="dark:text-dark-text-2 text-sm mr-0.5">
                Turn on desktop notifications
              </span>
              <ArrowIcon className="dark:fill-dark-svg-2" />
            </div>
          </div>
        </div>
      </div>
      <CloseIcon className="dark:fill-dark-svg-2" />
    </div>
  );
};
