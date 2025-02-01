import {
  BoxIcon,
  ChevronRightIcon,
  Code2Icon,
  LockIcon,
  MedalIcon,
  SearchIcon,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Translation } from '@/types/translation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/navigation';
import { routes } from '@/lib/routes';
import { SidebarCloseLink } from './sidebar-close-link';

function getItems(t: Translation) {
  return [
    {
      title: t.sidebar.search.title,
      href: routes.search.root,
      icon: SearchIcon,
      items: [
        {
          title: t.sidebar.search.items.ultimate,
          href: routes.search.root,
          disabled: true,
        },
        {
          title: t.sidebar.search.items.models,
          href: routes.search.models,
          disabled: true,
        },
        {
          title: t.sidebar.search.items.seeds,
          href: routes.search.seeds,
          disabled: true,
        },
        {
          title: t.sidebar.search.items.biomes,
          href: routes.search.biomes,
          disabled: true,
        },
        {
          title: t.sidebar.search.items.papers,
          href: routes.search.papers,
          disabled: true,
        },
      ],
    },
    {
      title: t.sidebar.simulator.title,
      href: routes.simulator.root,
      icon: BoxIcon,
      items: [
        {
          title: t.sidebar.simulator.items.enchantments,
          href: routes.simulator.enchantments,
          disabled: true,
        },
      ],
    },
    {
      title: t.sidebar.generator.title,
      href: routes.generator.root,
      icon: Code2Icon,
      items: [
        {
          title: t.sidebar.generator.items.recipes,
          href: routes.generator.recipes,
          disabled: true,
        },
      ],
    },
    {
      title: t.sidebar.competition.title,
      href: routes.competition.root,
      icon: MedalIcon,
      items: [
        {
          title: t.sidebar.competition.items.generators,
          href: routes.competition.generators,
          disabled: true,
        },
        {
          title: t.sidebar.competition.items.agents,
          href: routes.competition.agents,
          disabled: true,
        },
      ],
    },
  ];
}

interface AppSidebarProps {
  t: Translation;
}

export async function AppSidebar({ t }: AppSidebarProps) {
  const sidebarItems = getItems(t);

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenuButton size='lg' asChild>
          <Link href='/'>
            <div className='flex items-center justify-center px-1'>
              <Logo className='size-6' />
            </div>
            <div className='flex-1 text-left'>
              <h1 className='text-2xl'>{t.title}</h1>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.title} className='py-0'>
            <SidebarMenu>
              <Collapsible asChild defaultOpen key={group.title} className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={group.title}>
                      <group.icon />
                      <SidebarCloseLink href={group.href}>{group.title}</SidebarCloseLink>
                      <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {group.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          {subItem.disabled && (
                            <SidebarMenuButton asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='w-full justify-between'
                                disabled
                              >
                                {subItem.title}
                                <LockIcon />
                              </Button>
                            </SidebarMenuButton>
                          )}
                          {!subItem.disabled && (
                            <SidebarMenuSubButton asChild>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='w-full justify-start'
                                asChild
                              >
                                <SidebarCloseLink
                                  href={subItem.href}
                                  className='flex justify-between'
                                >
                                  {subItem.title}
                                </SidebarCloseLink>
                              </Button>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
