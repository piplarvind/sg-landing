// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// `.env.ts` is generated by the `npm run env` command
// import env from '@env/.env';
import { env } from './.env';

export const environment = {
  production: false,
  version: env.npm_package_version + '-dev',
  firebase: {
    apiKey: 'AIzaSyAl-bx0-N5foKCKJ6TV8wuYVUsbhQCRLxQ',
    // authDomain: 'sportsgrit-77a4b.firebaseapp.com',
    // databaseURL: 'https://sportsgrit-77a4b.firebaseio.com',
    projectId: 'sportsgrit-77a4b',
    storageBucket: 'sportsgrit-77a4b.appspot.com',
    messagingSenderId: '42507948141'
  },

  /*serverUrl: 'http://192.168.2.35:8000/api/v2/vb/',
  imageUrl: 'http://192.168.2.35:8000/v2/vb/',
  */

  //Local
  serverUrl: 'http://localhost:8000/api/v2/',
  imageUrl: 'http://localhost:8000/',
  resetpasswordurl: 'https://prodapi.sportgrit.com/manage/forgotPassword',
  

  Platform_Admin: 'PLA',
  Family_Friends_Fans: 'FFF',
  Club_Admin: 'CAD',
  Super_Admin: 'SAD',
  Coach: 'COA',
  Parent: 'PAR',
  Recruiter: 'REC',
  Athlete: 'ATH',
  match: 'Match',
  tryouts: 'Tryouts',
  
  // imageUrl: 'https://clubs.sportsgritinc.com:4000/sg',
  // serverUrl: 'https://api.sportsgritinc.com:4000',
  // 52.36.107.5

  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR']
};
