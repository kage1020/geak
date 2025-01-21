import { GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Language, Languages } from '@/lib/const';
import { Translation } from '@/types/translation';
import { Link } from '@/components/navigation';

interface LanguageSwitchProps {
  locale: Language;
  t: Translation['language'];
}

export function LanguageSwitch({ locale, t }: LanguageSwitchProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <GlobeIcon className='h-[1.2rem] w-[1.2rem]' />
          <span>{t[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {Languages.map((language) => (
          <DropdownMenuItem key={language} asChild className='cursor-pointer'>
            <Link locale={language}>{t[language]}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
