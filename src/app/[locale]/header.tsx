import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { auth, signIn, signOut } from '@/lib/auth';
import { Language } from '@/lib/const';
import { LanguageSwitch } from './language-switch';
import { ThemeToggle } from './theme-toggle';
import { Translation } from '@/types/translation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  locale: Language;
  t: Translation;
}

export async function Header({ locale, t }: HeaderProps) {
  const session = await auth();

  return (
    <div>
      <NavigationMenu className='w-full max-w-none justify-between p-2'>
        <SidebarTrigger />
        <NavigationMenuList className='w-full gap-2'>
          <NavigationMenuItem>
            <ThemeToggle t={t.theme} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LanguageSwitch locale={locale} t={t.language} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            {!session && (
              <Button
                variant='outline'
                onClick={async () => {
                  'use server';

                  await signIn();
                }}
              >
                {t.auth.login}
              </Button>
            )}
            {session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon' className='rounded-full focus-visible:ring-0'>
                    <Avatar className='size-6'>
                      <AvatarImage
                        src={session.user.image ?? undefined}
                        alt={session.user.name ?? t.auth.usernameFallback}
                      />
                      <AvatarFallback>
                        {session.user.name ?? t.auth.usernameFallback}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className='font-normal'>
                    {session.user.name ?? t.auth.usernameFallback}
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={async () => {
                      'use server';

                      await signOut();
                    }}
                  >
                    {t.auth.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
