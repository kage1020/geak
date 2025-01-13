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
import { BoxIcon, ChevronRightIcon, Code2Icon, LockIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/navigation';

interface AppSidebarProps {
  t: Translation;
}

export async function AppSidebar({ t }: AppSidebarProps) {
  const sidebarItems = [
    {
      title: t.sidebar.search.title,
      href: '/search',
      icon: SearchIcon,
      items: [
        {
          title: t.sidebar.search.items.ultimate,
          href: '/search',
          disabled: true,
        },
        {
          title: t.sidebar.search.items.models,
          href: '/search/models',
          disabled: true,
        },
        {
          title: t.sidebar.search.items.seeds,
          href: '/search/seeds',
          disabled: true,
        },
        {
          title: t.sidebar.search.items.biomes,
          href: '/search/biomes',
          disabled: true,
        },
        {
          title: t.sidebar.search.items.papers,
          href: '/search/papers',
          disabled: true,
        },
      ],
    },
    {
      title: t.sidebar.simulator.title,
      href: '/simulator',
      icon: BoxIcon,
      items: [
        {
          title: t.sidebar.simulator.items.enchantments,
          href: '/simulator/enchantments',
          disabled: true,
        },
      ],
    },
    {
      title: t.sidebar.generator.title,
      href: '/generator',
      icon: Code2Icon,
      items: [
        {
          title: t.sidebar.generator.items.recipes,
          href: '/generator/recipes',
          disabled: true,
        },
      ],
    },
  ];

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
                      <Link href={group.href}>{group.title}</Link>
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
                                disabled={subItem.disabled}
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
                                disabled={subItem.disabled}
                              >
                                <Link href={subItem.href} className='flex justify-between'>
                                  {subItem.title}
                                </Link>
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
