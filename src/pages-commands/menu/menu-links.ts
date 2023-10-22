export interface MenuLink {
  display: string;
  url: string;
}

export const COMMANDS_LIST: MenuLink[] = [
  { display: 'find', url: '/comandos/find' },
  { display: 'if', url: '/comandos/if' },
];
