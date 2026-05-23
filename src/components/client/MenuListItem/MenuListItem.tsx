import React from "react";
import { Icon } from "@iconify/react";
import "./MenuListItem.css";

export interface MenuListItemProps {
  icon: string;
  label: string;
  onClick?: () => void;
  /** optional right-side badge / chip */
  badge?: string;
  /** show a subtle separator below (default true) */
  divider?: boolean;
  /** show the right chevron (default true) */
  showChevron?: boolean;
}

const MenuListItem: React.FC<MenuListItemProps> = ({
  icon,
  label,
  onClick,
  badge,
  divider = true,
  showChevron = true,
}) => {
  return (
    <div
      className={`mli-item ${divider ? "mli-divider" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="mli-left">
        <div className="mli-icon-wrap">
          <Icon icon={icon} className="mli-icon" />
        </div>
        <span className="mli-label">{label}</span>
      </div>

      <div className="mli-right">
        {badge && <span className="mli-badge">{badge}</span>}
        {showChevron && (
          <Icon icon="mdi:chevron-right" className="mli-chevron" />
        )}
      </div>
    </div>
  );
};

export default MenuListItem;
