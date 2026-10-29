import { mountGrid } from './mount.ts';

document.querySelectorAll<HTMLElement>('[data-grid]').forEach(mountGrid);
