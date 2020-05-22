CREATE SCHEMA `coins_catalog`;
USE coins_catalog;

CREATE TABLE user_roles (
	id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL UNIQUE,
    password_salt VARCHAR(255) NOT NULL UNIQUE,
    token VARCHAR(255) UNIQUE, 
	user_role INT NOT NULL,
    INDEX user_role_index (user_role),
    FOREIGN KEY (user_role) REFERENCES user_roles(id)
);

INSERT INTO user_roles(role_name) VALUES ('administrator');
-- Add user without token.
INSERT INTO users(user_name, password_hash, password_salt, user_role) VALUES ('admin', '$2b$10$B1MGYEYQqa7IQx2kdg.YKeNZS9xTHPuvDs/ZaxF8JYPPhto.rbtlC', '$2b$10$B1MGYEYQqa7IQx2kdg.YKe', 1);

CREATE TABLE coin_types (
	id INT PRIMARY KEY AUTO_INCREMENT,
	type_name VARCHAR(255) NOT NULL
);

CREATE TABLE coins (
	id INT PRIMARY KEY AUTO_INCREMENT,
    coin_name VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
	issuing_country VARCHAR(255) NOT NULL,
    composition VARCHAR(255) NOT NULL,
    quality VARCHAR(255) NOT NULL,
    denomination VARCHAR(255) NOT NULL,
    coin_year SMALLINT NOT NULL,
    weight DECIMAL(4, 2) NOT NULL,
    price SMALLINT NOT NULL,
    obverse_path VARCHAR(255) NOT NULL,
	reverse_path VARCHAR(255) NOT NULL,
    coin_type INT NOT NULL,
    INDEX coin_type_index (coin_type),
    FOREIGN KEY (coin_type) REFERENCES coin_types(id)
);

INSERT INTO coin_types (type_name) VALUES 
('Commemorative coins'),
('Bullion coins'),
('Exclusive coins');

-- Add 2 Commemorative coins

-- INSERT INTO coins 
-- (coin_name, short_description, full_description, issuing_country, composition, quality, denomination, coin_year, weight, price, obverse_path, reverse_path, coin_type) 
-- VALUES 
-- ('Canadian Beaver', '"Canadian beaver". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.', 'In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.', 'CANADA', 'nickel', 'BU', '5 cents', 1965, 4.54, 40, 'coins/Canadian Beaver_1.png', 'coins/Canadian Beaver_2.png', 1),
-- ('Looney','"Looney". Unique coin with the image of a goat. Canadian dollar symbol.','The reverse of the coin depicts a black goat - a symbol of Canada and an inscription divided into the lower and upper semicircle "Canadian dollar". The obverse depicts Queen Elizabeth II. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is the year of coinage.','CANADA','gold','BU','1 dollar', 1970, 5.4, 65, 'coins/Looney_1.png', 'coins/Looney_2.png', 1);

-- Add 2 Bullion coins

-- INSERT INTO coins 
-- (coin_name, short_description, full_description, issuing_country, composition, quality, denomination, coin_year, weight, price, obverse_path, reverse_path, coin_type) 
-- VALUES 
-- ('South Vietnamese Dong','Currency of the Republic of Vietnam in 1955-1975 Coin with the image of wheat.','Currency of the Republic of Vietnam in 1955-1975. On the front side, we see wheat, and on the back, a unit symbolizing money. The monetary unit of South Vietnam was originally the Indochinese piastre, issued by the Institute of Emissions of the States of Cambodia, Laos and Vietnam. Banknotes of the graduating institute were issued in three types: Cambodian, Lao and Vietnamese. The inscriptions on the banknotes of all samples were made in four languages: French, Khmer, Lao and Vietnamese. Vietnamese-style banknotes depicted a pattern, as well as the inscription “VIÊN PHÁT-HÀNH”. Piastres previously issued by the French Bank of Indochina were also in circulation.','the Republic of Vietnam', 'nickel', 'BU', '1 dong', 1955, 5.05, 56, 'coins/South Vietnamese Dong_1.png', 'coins/South Vietnamese Dong_2.png', 2),
-- ('The British Antelope', 'Unique coin depicting an antelope. British South African gold coin with a face value of 1/2 pound. It has been produced since 1952.', 'On one side of the coin is the head of King George VI, turned to the left. Also at the top in a semicircle is the inscription GEORGIVS SEXTVS REX. On the other side of the coin is an Antelope. Around it is the inscription SOUTH AFRICA 1952 SUID AFRICA, dotted with dots. Below is the nominal value.','British South Africa','gold','BU', '1/2 pound', 1952, 6.3, 78, 'coins/The British Antelope_1.png', 'coins/The British Antelope_2.png', 2);

-- Add 2 Exclusive coins

-- INSERT INTO coins 
-- (coin_name, short_description, full_description, issuing_country, composition, quality, denomination, coin_year, weight, price, obverse_path, reverse_path, coin_type) 
-- VALUES
-- ('Lion sedge', 'Indian coin with the image of a lion Ashoka. Face value 1 one rupee. 1975 edition.', 'It depicts the lion Ashok on his pedestal. It is surrounded by the inscription of the name of the country in two languages, meaning and date, surrounded by stylized stalks of grain. The rupee (from Sanskrit silver) is an Indian historical silver coin, put into circulation in the 15th century, as well as the monetary unit of a number of countries in South Asia. After the British conquest of Burma in 1852, the Indian rupee became its currency. In 1938, Burma became an independent British colony. A year earlier, the release of the Burmese rupee, which lasted until 1952, began. In 1952, the Burmese rupee was replaced by a kyat. The rupee remained the currency of Portuguese possessions in India until 1959, when it was replaced by the escudos of Portuguese India.', 'India', 'steel', 'BU', '1 rupee', 1975, 4.95, 76, 'coins/Lion sedge_1.png', 'coins/Lion sedge_2.png', 3),
-- ('Rial', 'Iranian silver coin with the image of a lion. Face value 5000 five thousand dinars (5 five taps). 1928 year.', 'It depicts a bust of Reza Shah, whose head is turned to the right. On the other side is a lion with a saber in front of the radiant sun. Above it is a crown. Before the monetary reform of 1932, the currency of Iran was fog. (1 fog = 10 clicks, 1 crane = 1000 dinars.) Currently, the name "fog" is used to denote the amount of 10 reais.', 'Iran', 'silver', 'BU', '5000 dinars', 1928, 6.12, 98, 'coins/Rial_1.png', 'coins/Rial_2.png', '3');

CREATE TABLE countries (
	id INT PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(255) NOT NULL
);

INSERT INTO countries
(country_name)
VALUES
('Afghanistan'),
('Albania'),
('Algeria'),
('Andorra'),
('Angola'),
('Antigua and Barbuda'),
('Argentina'),
('Australia'),
('Austria'),
('Azerbaijan'),
('Bahamas'),
('Bahrain'),
('Bangladesh'),
('Barbados'),
('Belarus'),
('Belgium'),
('Belize'),
('Benin'),
('Bhutan'),
('Bolivia'),
('Bosnia and Herzegovina'),
('Botswana'),
('Brazil'),
('Brunei'),
('Bulgaria'),
('Burkina Faso'),
('Burundi'),
('Cabo Verde'),
('Cambodia'),
('Cameroon'),
('Canada'),
('Central African Republic (CAR)'),
('Chad'),
('Chile'),
('China'),
('Colombia'),
('Comoros'),
('Congo, Democratic Republic of the Congo'), 
('Republic of the'),
('Costa Rica'),
('Cote d`Ivoire'),
('Croatia'),
('Cuba'),
('Cyprus'),
('Czechia'),
('Denmark'),
('Djibouti'),
('Dominica'),
('Dominican Republic'),
('Ecuador'),
('Egypt'),
('El Salvador'),
('Equatorial Guinea'),
('Eritrea'),
('Estonia'),
('Eswatini (formerly Swaziland)'),
('Ethiopia'),
('Fiji'),
('Finland'),
('France'),
('Gabon'),
('Gambia'),
('Georgia'),
('Germany'),
('Ghana'),
('Greece'),
('Grenada'),
('Guatemala'),
('Guinea'),
('Guinea-Bissau'),
('Guyana'),
('Haiti'),
('Honduras'),
('Hungary'),
('Iceland'),
('India'),
('Indonesia'),
('Iran'),
('Iraq'),
('Ireland'),
('Israel'),
('Italy'),
('Jamaica'),
('Japan'),
('Jordan'),
('Kazakhstan'),
('Kenya'),
('Kiribati'),
('Kosovo'),
('Kuwait'),
('Kyrgyzstan'),
('Laos'),
('Latvia'),
('Lebanon'),
('Lesotho'),
('Liberia'),
('Libya'),
('Liechtenstein'),
('Lithuania'),
('Luxembourg'),
('Madagascar'),
('Malawi'),
('Malaysia'),
('Maldives'),
('Mali'),
('Malta'),
('Marshall Islands'),
('Mauritania'),
('Mauritius'),
('Mexico'),
('Micronesia'),
('Moldova'),
('Monaco'),
('Mongolia'),
('Montenegro'),
('Morocco'),
('Mozambique'),
('Myanmar (formerly Burma)'),
('Namibia'),
('Nauru'),
('Nepal'),
('Netherlands'),
('New Zealand'),
('Nicaragua'),
('Niger'),
('Nigeria'),
('North Korea'),
('North Macedonia (formerly Macedonia)'),
('Norway'),
('Oman'),
('Pakistan'),
('Palau'),
('Palestine'),
('Panama'),
('Papua New Guinea'),
('Paraguay'),
('Peru'),
('Philippines'),
('Poland'),
('Portugal'),
('Qatar'),
('Romania'),
('Russia'),
('Rwanda'),
('Saint Kitts and Nevis'),
('Saint Lucia'),
('Saint Vincent and the Grenadines'),
('Samoa'),
('San Marino'),
('Sao Tome and Principe'),
('Saudi Arabia'),
('Senegal'),
('Serbia'),
('Seychelles'),
('Sierra Leone'),
('Singapore'),
('Slovakia'),
('Slovenia'),
('Solomon Islands'),
('Somalia'),
('South Africa'),
('South Korea'),
('South Sudan'),
('Spain'),
('Sri Lanka'),
('Sudan'),
('Suriname'),
('Sweden'),
('Switzerland'),
('Syria'),
('Taiwan'),
('Tajikistan'),
('Tanzania'),
('Thailand'),
('Timor-Leste'),
('Togo'),
('Tonga'),
('Trinidad and Tobago'),
('Tunisia'),
('Turkey'),
('Turkmenistan'),
('Tuvalu'),
('Uganda'),
('Ukraine'),
('United Arab Emirates (UAE)'),
('United Kingdom (UK)'),
('United States of America (USA)'),
('Uruguay'),
('Uzbekistan'),
('Vanuatu'),
('Vatican City (Holy See)'),
('Venezuela'),
('Vietnam'),
('Yemen'),
('Zambia'),
('Zimbabwe');

CREATE TABLE compositions (
	id INT PRIMARY KEY AUTO_INCREMENT,
    metal VARCHAR(255) NOT NULL
);

INSERT INTO compositions 
(metal) VALUES 
('Nickel'),
('Gold'),
('Steel'),
('Silver');

-- Ready ! 