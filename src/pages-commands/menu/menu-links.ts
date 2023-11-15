export interface MenuLink {
  display: string;
  url: string;
}

export const COMMANDS_LIST: MenuLink[] = [
  { display: 'find', url: '/comandos/find' },
  { display: 'if', url: '/comandos/if' },
  { display: 'nmap', url: '/comandos/nmap' },
  { display: 'cd', url: '/comandos/cd' },
  { display: 'host', url: '/comandos/host' },
];
