'use client';

import { useRouter } from 'next/navigation';
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

interface LanguageSwitchProps {
  locale: Language;
  t: Translation['language'];
}

export function LanguageSwitch({ locale, t }: LanguageSwitchProps) {
  const router = useRouter();

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
          <DropdownMenuItem key={language} onClick={() => router.push(language)}>
            {t[language]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
