import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Videos',
    icon: 'video-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Liked Videos',
    icon: 'heart-outline',
    link: '/pages/liked',
  },
  {
    title: 'Disliked Videos',
    icon: 'arrow-circle-down-outline',
    link: '/pages/disliked',
  }
];
