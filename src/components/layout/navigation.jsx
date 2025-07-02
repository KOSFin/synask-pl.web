import { FaHome, FaUserFriends, FaRocketchat, FaBell, FaCog } from 'react-icons/fa';

export const navItems = (device) => [
  {
    path: `/${device}/`,
    icon: FaHome,
    title: 'Главная',
  },
  {
    path: `/${device}/friends`,
    icon: FaUserFriends,
    title: 'Друзья',
  },
  {
    path: `/${device}/messages`,
    icon: FaRocketchat,
    title: 'Сообщения',
  },
  {
    path: `/${device}/notifications`,
    icon: FaBell,
    title: 'Уведомления',
  },
  {
    path: `/${device}/settings`,
    icon: FaCog,
    title: 'Настройки',
  },
];
