// Static catalog data. Previously this lived in a MySQL database served by an
// Express backend; it is now bundled with the app so the whole project can be
// hosted as static files (e.g. on GitHub Pages) with no server or database.

export const CATEGORIES = [
  { id: 1, slug: 'commemorative', name: 'Commemorative coins' },
  { id: 2, slug: 'bullion', name: 'Bullion coins' },
  { id: 3, slug: 'exclusive', name: 'Exclusive coins' },
];

export const coins = [
  {
    id: 1,
    coin_name: 'Canadian Beaver',
    short_description:
      '"Canadian beaver". Unique coin with the image of a beaver. Face value — 5 cents. Created under Elizabeth II.',
    full_description:
      'In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.',
    issuing_country: 'Canada',
    composition: 'Nickel',
    quality: 'BU',
    denomination: '5 cents',
    coin_year: 1965,
    weight: 4.54,
    price: 40,
    coin_type: 1,
  },
  {
    id: 2,
    coin_name: 'Looney',
    short_description:
      '"Looney". Unique coin with the image of a goat. Canadian dollar symbol.',
    full_description:
      'The reverse of the coin depicts a black goat — a symbol of Canada — and an inscription divided into the lower and upper semicircle "Canadian dollar". The obverse depicts Queen Elizabeth II. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is the year of coinage.',
    issuing_country: 'Canada',
    composition: 'Gold',
    quality: 'BU',
    denomination: '1 dollar',
    coin_year: 1970,
    weight: 5.4,
    price: 65,
    coin_type: 1,
  },
  {
    id: 3,
    coin_name: 'South Vietnamese Dong',
    short_description:
      'Currency of the Republic of Vietnam in 1955–1975. Coin with the image of wheat.',
    full_description:
      'On the front side we see wheat, and on the back a unit symbolizing money. The monetary unit of South Vietnam was originally the Indochinese piastre, issued by the Institute of Emissions of the States of Cambodia, Laos and Vietnam. Inscriptions on the banknotes were made in four languages: French, Khmer, Lao and Vietnamese.',
    issuing_country: 'Vietnam',
    composition: 'Nickel',
    quality: 'BU',
    denomination: '1 dong',
    coin_year: 1955,
    weight: 5.05,
    price: 56,
    coin_type: 2,
  },
  {
    id: 4,
    coin_name: 'The British Antelope',
    short_description:
      'Unique coin depicting an antelope. British South African gold coin with a face value of 1/2 pound. Produced since 1952.',
    full_description:
      'On one side of the coin is the head of King George VI, turned to the left, with the inscription GEORGIVS SEXTVS REX in a semicircle at the top. On the other side of the coin is an antelope, surrounded by the inscription SOUTH AFRICA 1952 SUID AFRICA dotted with dots. Below is the nominal value.',
    issuing_country: 'South Africa',
    composition: 'Gold',
    quality: 'BU',
    denomination: '1/2 pound',
    coin_year: 1952,
    weight: 6.3,
    price: 78,
    coin_type: 2,
  },
  {
    id: 5,
    coin_name: 'Lion Sedge',
    short_description:
      'Indian coin with the image of the lion of Ashoka. Face value 1 rupee. 1975 edition.',
    full_description:
      'It depicts the lion of Ashoka on its pedestal, surrounded by the name of the country in two languages, the value and date, framed by stylized stalks of grain. The rupee (from Sanskrit, "silver") is an Indian historical silver coin put into circulation in the 15th century, and the monetary unit of a number of countries in South Asia.',
    issuing_country: 'India',
    composition: 'Steel',
    quality: 'BU',
    denomination: '1 rupee',
    coin_year: 1975,
    weight: 4.95,
    price: 76,
    coin_type: 3,
  },
  {
    id: 6,
    coin_name: 'Rial',
    short_description:
      'Iranian silver coin with the image of a lion. Face value 5000 dinars. 1928.',
    full_description:
      'It depicts a bust of Reza Shah, whose head is turned to the right. On the other side is a lion with a saber in front of the radiant sun, topped by a crown. Before the monetary reform of 1932, the currency of Iran was the toman (1 toman = 10 krans, 1 kran = 1000 dinars).',
    issuing_country: 'Iran',
    composition: 'Silver',
    quality: 'BU',
    denomination: '5000 dinars',
    coin_year: 1928,
    weight: 6.12,
    price: 98,
    coin_type: 3,
  },
];

// Filter option lists are derived from the catalog so they always stay in sync.
export const countries = [...new Set(coins.map((c) => c.issuing_country))].sort();
export const compositions = [...new Set(coins.map((c) => c.composition))].sort();
