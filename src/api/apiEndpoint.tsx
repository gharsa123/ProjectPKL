import { BaseUrl } from './Constants';

interface Endpoints {
  aplikasi: {
    [key: string]: string;
  }
  database: {
    [key: string]: string;
  }
  domain: {
    [key: string]: string;
  }
  email: {
    [key: string]: string;
  }
  organization: {
    [key: string]: string;
  }
  servers: {
    [key: string]: string;
  }
  auth: {
    [key: string]: string;
  }
}

export const endpoints: Endpoints = {
    aplikasi: {
        sinar12 : `${BaseUrl}/aplikasi/aplikasi4`,
        cmm : `${BaseUrl}/aplikasi/aplikasi1`,
        gap : `${BaseUrl}/aplikasi/aplikasi2`,
        bion : `${BaseUrl}/aplikasi/aplikasi`,
        sr12 : `${BaseUrl}/aplikasi/aplikasi5`,
        ptkayo : `${BaseUrl}/aplikasi/aplikasi3`,
    },
    database: {
       sinar12 : `${BaseUrl}/dbdatabase/dbdatabase4`,
       cmm : `${BaseUrl}/dbdatabase/dbdatabase1`,
       gap : `${BaseUrl}/dbdatabase/dbdatabase2`,
       bion : `${BaseUrl}/dbdatabase/dbdatabase`,
       sr12 : `${BaseUrl}/dbdatabase/dbdatabase5`,
       ptkayo : `${BaseUrl}/dbdatabase/dbdatabase3`,
    },
    domain: {
      sinar12 : `${BaseUrl}/domain/domain4`,
      cmm : `${BaseUrl}/domain/domain1`,
      gap : `${BaseUrl}/domain/domain2`,
      bion : `${BaseUrl}/domain/domain`,
      sr12 : `${BaseUrl}/domain/domain5`,
      ptkayo : `${BaseUrl}/domain/domain3`,

    },
    email: {
       sinar12 : `${BaseUrl}/email/email4`,
      cmm : `${BaseUrl}/email/email1`,
      gap : `${BaseUrl}/email/email2`,
      bion : `${BaseUrl}/email/email`,
      sr12 : `${BaseUrl}/email/email5`,
      ptkayo : `${BaseUrl}/email/email3`,
      },

    servers: {
      sinar12 : `${BaseUrl}/servers/servers4`,
      cmm : `${BaseUrl}/servers/servers1`,
      gap : `${BaseUrl}/servers/servers2`,
      bion : `${BaseUrl}/servers/servers`,
      sr12 : `${BaseUrl}/servers/servers5`,
      ptkayo : `${BaseUrl}/servers/servers3`,     
    },

    organization: {
        all:`${BaseUrl}/organization/organization`
    },
    auth: {
        me: `${BaseUrl}/me`,
        login: `${BaseUrl}/login`,
        logout: `${BaseUrl}/logout`,
        users: `${BaseUrl}/users`,
        forgot: `${BaseUrl}/forgot`,
        resetPass: `${BaseUrl}/resetpass`
    },
};
