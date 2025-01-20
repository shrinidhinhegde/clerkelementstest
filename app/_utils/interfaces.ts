import {ForwardRefExoticComponent, RefAttributes} from "react";
import {LucideProps} from "lucide-react";

export interface FooterNavItemProps {
  href: string,
  title: string,
}

export interface SideNavItemProps {
  href: string,
  title: string,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  badge?: string
}

export interface ClerkOrgData {
  "id": "string",
  "role": "string",
  // there is more, but we only need these two at most. Refer: https://clerk.com/docs/reference/backend-api/tag/Users#operation/UsersGetOrganizationMemberships
}

export interface ClerkOrgResponse {
  data: ClerkOrgData[],
  total_count: number,
}