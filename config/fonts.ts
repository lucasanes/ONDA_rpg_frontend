import {
  Fira_Code,
  IM_Fell_English,
  Poppins,
  Protest_Revolution,
  Special_Elite,
} from 'next/font/google';

export const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const protestRevolution = Protest_Revolution({
  subsets: ['latin'],
  weight: ['400'],
});

export const imFellEnglish = IM_Fell_English({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
});

export const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: ['400'],
});
