export const HospitalData=[
  {
    "_id":  "667a4e1b8b2d4c5e9a330001" ,
    "hospitalName": "Nairobi Hospital",
    "code": "HOSP-001",
    "tier": "Level 6 Tertiary",
    "location": {
      "address": "Argwings Kodhek Road, Upper Hill",
      "city": "Nairobi",
      "country": "Kenya"
    },
    "contact": {
      "phone": "+254 703 082000",
      "email": "info@nairobihospital.org",
      "emergencyExt": "999 / 222"
    },
    "operationalCapacity": {
      "totalBeds": 500,
      "icuBeds": 30,
      "theatres": 8
    },
    "insurancePanels": ["NHIF", "AON Minet", "Jubilee Insurance", "UAP Old Mutual", "CIC Insurance"],
    "status": "Active",
    "createdAt": { "$date": "2025-01-10T06:00:00.000Z" }
  },
  {
    "_id":  "667a4e1b8b2d4c5e9a330002" ,
    "hospitalName": "Aga Khan University Hospital",
    "code": "HOSP-002",
    "tier": "Level 6 Tertiary",
    "location": {
      "address": "3rd Parklands Avenue, Limuru Road",
      "city": "Nairobi",
      "country": "Kenya"
    },
    "contact": {
      "phone": "+254 711 090000",
      "email": "akhn@aku.edu",
      "emergencyExt": "112"
    },
    "operationalCapacity": {
      "totalBeds": 300,
      "icuBeds": 22,
      "theatres": 6
    },
    "insurancePanels": ["NHIF", "Jubilee Insurance", "UAP Old Mutual", "Britam", "Sanlam"],
    "status": "Active",
    "createdAt": { "$date": "2025-01-12T07:15:00.000Z" }
  },
  {
    "_id":  "667a4e1b8b2d4c5e9a330003" ,
    "hospitalName": "MP Shah Hospital",
    "code": "HOSP-003",
    "tier": "Level 5 Referral",
    "location": {
      "address": "Shivachi Road, Parklands",
      "city": "Nairobi",
      "country": "Kenya"
    },
    "contact": {
      "phone": "+254 722 204427",
      "email": "info@mpshahhosp.org",
      "emergencyExt": "200"
    },
    "operationalCapacity": {
      "totalBeds": 210,
      "icuBeds": 12,
      "theatres": 4
    },
    "insurancePanels": ["NHIF", "AON Minet", "Jubilee Insurance", "Madison Insurance", "APA Insurance"],
    "status": "Inactive",
    "createdAt": { "$date": "2025-02-01T09:30:00.000Z" }
  },
  {
    "_id":  "667a4e1b8b2d4c5e9a330004" ,
    "hospitalName": "Mater Hospital",
    "code": "HOSP-004",
    "tier": "Level 5 Referral",
    "location": {
      "address": "Dunga Road, Industrial Area",
      "city": "Nairobi",
      "country": "Kenya"
    },
    "contact": {
      "phone": "+254 719 073000",
      "email": "inform@materkenya.com",
      "emergencyExt": "101"
    },
    "operationalCapacity": {
      "totalBeds": 175,
      "icuBeds": 10,
      "theatres": 3
    },
    "insurancePanels": ["NHIF", "Jubilee Insurance", "CIC Insurance", "Britam", "AIG"],
    "status": "Active",
    "createdAt": { "$date": "2025-02-18T11:00:00.000Z" }
  }
]