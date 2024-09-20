import { BaseUrl } from './Constants';

interface EndpointsbyID {
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
}

export const endpointbyID: EndpointsbyID = {
  aplikasi: {
    sinar12: `${BaseUrl}/aplikasi/aplikasi4/:id`,
    cmm: `${BaseUrl}/aplikasi/aplikasi1/:id`,
    gap: `${BaseUrl}/aplikasi/aplikasi2/:id`,
    bionac: `${BaseUrl}/aplikasi/aplikasi/:id`,
    sr12: `${BaseUrl}/aplikasi/aplikasi5/:id`,
    ptkayo: `${BaseUrl}/aplikasi/aplikasi3/:id`,
},
database: {
    sinar12 : `${BaseUrl}/dbdatabase/dbdatabase4/:id`,
    cmm : `${BaseUrl}/dbdatabase/dbdatabase1/:id`,
    gap : `${BaseUrl}/dbdatabase/dbdatabase2/:id`,
    bion : `${BaseUrl}/dbdatabase/dbdatabase/:id`,
    sr12 : `${BaseUrl}/dbdatabase/dbdatabase5/:id`,
    ptkayo : `${BaseUrl}/dbdatabase/dbdatabase3/:id`,
},
domain: {
  sinar12 : `${BaseUrl}/domain/domain4/:id`,
  cmm : `${BaseUrl}/domain/domain1/:id`,
  gap : `${BaseUrl}/domain/domain2/:id`,
  bion : `${BaseUrl}/domain/domain/:id`,
  sr12 : `${BaseUrl}/domain/domain5/:id`,
  ptkayo : `${BaseUrl}/domain/domain3/:id`,
},
email: {
    sinar12 : `${BaseUrl}/email/email4/:id`,
  cmm : `${BaseUrl}/email/email1/:id`,
  gap : `${BaseUrl}/email/email2/:id`,
  bion : `${BaseUrl}/email/email/:id`,
  sr12 : `${BaseUrl}/email/email5/:id`,
  ptkayo : `${BaseUrl}/email/email3/:id`,
},
organization: {
    all:`${BaseUrl}/organization/organization/:id`
},
servers: {
      sinar12 : `${BaseUrl}/servers/servers4/:id`,
      cmm : `${BaseUrl}/servers/servers1/:id`,
      gap : `${BaseUrl}/servers/servers2/:id`,
      bion : `${BaseUrl}/servers/servers/:id`,
      sr12 : `${BaseUrl}/servers/servers5/:id`,
      ptkayo : `${BaseUrl}/servers/servers3/:id`, 
    },
}