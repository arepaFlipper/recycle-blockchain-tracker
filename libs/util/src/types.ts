import { ReactNode, ElementType } from "react";
import { Icon as IconType } from "@tabler/icons-react";

export type MenuItem = {
  label: string;
  href: string;
  Icon: IconType;
}

export type BaseComponent = {
  children?: ReactNode;
  className?: string;
}
