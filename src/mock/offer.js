const OFFERS = [
  {
    id: 0,
    type:'taxi',
    offers:[
      {
        title:'Ride on taxi',
        price: 100,
      },
      {
        title:'Ride on next town',
        price: 2000,
      }
    ]
  },
  {
    id: 1,
    type:'bus',
    offers:[
      {
        title:'Ride on bus',
        price: 30,
      },
      {
        title:'Ride on next town',
        price: 500,
      }
    ]
  },
  {
    id: 2,
    type:'train',
    offers:[
      {
        title:'Ride on train in next station',
        price: 200,
      },
      {
        title:'Ride on train on next town',
        price: 2500,
      },
      {
        title:'Eat on train',
        price: 220,
      }
    ]
  },
  {
    id: 3,
    type:'ship',
    offers:[
      {
        title:'Cruise',
        price: 4750,
      },
    ]
  },
  {
    id: 4,
    type:'drive',
    offers:[
      {
        title:'With conditioner',
        price: 80,
      },
      {
        title:'New car',
        price: 500,
      }
    ]
  },
  {
    id: 5,
    type:'flight',
    offers:[
      {
        title:'helicopter',
        price: 3000,
      },
      {
        title:'Aeroplan',
        price: 500,
      },
      {
        title:'Baloon',
        price: 1500,
      }
    ]
  },
  {
    id: 6,
    type:'check-in',
    offers:[
      {
        title:'Add breakfast',
        price: 80,
      },
    ]
  },
  {
    id: 7,
    type:'sightseeing',
    offers:[
      {
        title:'upgrade class',
        price: 180,
      },
      {
        title:'add luggage',
        price: 500,
      }
    ]
  },
  {
    id: 8,
    type:'restaurant',
    offers:[
      {
        title:'live music',
        price: 200,
      },
      {
        title:'vip area',
        price: 500,
      }
    ]
  },
];

export const offers = Array.from(OFFERS);


