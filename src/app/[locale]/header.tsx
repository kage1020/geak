import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Language } from '@/lib/const';
import { Translation } from '@/types/translation';
import { LanguageSwitch } from './language-switch';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  locale: Language;
  t: Translation;
}

export function Header({ locale, t }: HeaderProps) {
  return (
    <NavigationMenu className='w-full max-w-none justify-between p-2'>
      <SidebarTrigger />
      <NavigationMenuList className='w-full gap-2'>
        <NavigationMenuItem>
          <ThemeToggle t={t.theme} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LanguageSwitch locale={locale} t={t.language} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
