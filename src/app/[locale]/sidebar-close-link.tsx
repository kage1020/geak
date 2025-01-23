'use client';

import { Link } from '@/components/navigation';
import { useSidebar } from '@/components/ui/sidebar';

type SidebarCloseLinkProps = React.ComponentProps<typeof Link>;

export function SidebarCloseLink({ onClick, ...props }: SidebarCloseLinkProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) setOpenMobile(false);
    if (onClick) onClick(e);
  };

  return <Link onClick={handleClick} {...props} />;
}
