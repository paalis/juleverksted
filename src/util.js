import { par } from './content.js';

export const coupleName = (p) => (p ? p.navn.filter(Boolean).join(' og ') : '');
export const coupleById = (id) => par.find((p) => p.id === id);
export const nameOf = (id) => coupleName(coupleById(id)) || 'Noen';

export const plural = (n, en, flere) => `${n} ${n === 1 ? en : flere}`;

export const newId = () =>
  (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}${Math.random()}`)
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 24);

export const slug = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
