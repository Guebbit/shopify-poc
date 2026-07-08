/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
    T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/**
 * A custom key-value pair that stores additional information on a [cart](https://shopify.dev/docs/api/storefront/current/objects/Cart) or [cart line](https://shopify.dev/docs/api/storefront/current/objects/CartLine). Attributes capture additional information like gift messages, special instructions, or custom order details. Learn more about [managing carts with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage).
 *
 */
export type AttributeInput = {
    /** Key or name of the attribute. */
    key: string;
    /** Value of the attribute. */
    value: string;
};

/**
 * The input fields for adding a merchandise line to a cart. Each line represents a [`ProductVariant`](https://shopify.dev/docs/api/storefront/current/objects/ProductVariant) the buyer intends to purchase, along with the quantity and optional [`SellingPlan`](https://shopify.dev/docs/api/storefront/current/objects/SellingPlan) for subscriptions.
 *
 * Used by the [`cartCreate`](https://shopify.dev/docs/api/storefront/current/mutations/cartCreate) mutation when creating a cart with initial items, and the [`cartLinesAdd`](https://shopify.dev/docs/api/storefront/current/mutations/cartLinesAdd) mutation when adding items to an existing cart.
 *
 */
export type CartLineInput = {
    /**
     * An array of key-value pairs that contains additional information about the merchandise line.
     *
     * The input must not contain more than `250` values.
     */
    attributes?: Array<AttributeInput> | null | undefined;
    /** The ID of the merchandise that the buyer intends to purchase. */
    merchandiseId: string | number;
    /** The parent line item of the cart line. */
    parent?: CartLineParentInput | null | undefined;
    /** The quantity of the merchandise. */
    quantity?: number | null | undefined;
    /** The ID of the selling plan that the merchandise is being purchased with. */
    sellingPlanId?: string | number | null | undefined;
};

/** The parent line item of the cart line. */
export type CartLineParentInput = {
    /** The id of the parent line item. */
    lineId?: string | number | null | undefined;
    /** The ID of the parent line merchandise. */
    merchandiseId?: string | number | null | undefined;
};

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 *
 */
export type CountryCode =
    /** Ascension Island. */
    | 'AC'
    /** Andorra. */
    | 'AD'
    /** United Arab Emirates. */
    | 'AE'
    /** Afghanistan. */
    | 'AF'
    /** Antigua & Barbuda. */
    | 'AG'
    /** Anguilla. */
    | 'AI'
    /** Albania. */
    | 'AL'
    /** Armenia. */
    | 'AM'
    /** Netherlands Antilles. */
    | 'AN'
    /** Angola. */
    | 'AO'
    /** Argentina. */
    | 'AR'
    /** Austria. */
    | 'AT'
    /** Australia. */
    | 'AU'
    /** Aruba. */
    | 'AW'
    /** Åland Islands. */
    | 'AX'
    /** Azerbaijan. */
    | 'AZ'
    /** Bosnia & Herzegovina. */
    | 'BA'
    /** Barbados. */
    | 'BB'
    /** Bangladesh. */
    | 'BD'
    /** Belgium. */
    | 'BE'
    /** Burkina Faso. */
    | 'BF'
    /** Bulgaria. */
    | 'BG'
    /** Bahrain. */
    | 'BH'
    /** Burundi. */
    | 'BI'
    /** Benin. */
    | 'BJ'
    /** St. Barthélemy. */
    | 'BL'
    /** Bermuda. */
    | 'BM'
    /** Brunei. */
    | 'BN'
    /** Bolivia. */
    | 'BO'
    /** Caribbean Netherlands. */
    | 'BQ'
    /** Brazil. */
    | 'BR'
    /** Bahamas. */
    | 'BS'
    /** Bhutan. */
    | 'BT'
    /** Bouvet Island. */
    | 'BV'
    /** Botswana. */
    | 'BW'
    /** Belarus. */
    | 'BY'
    /** Belize. */
    | 'BZ'
    /** Canada. */
    | 'CA'
    /** Cocos (Keeling) Islands. */
    | 'CC'
    /** Congo - Kinshasa. */
    | 'CD'
    /** Central African Republic. */
    | 'CF'
    /** Congo - Brazzaville. */
    | 'CG'
    /** Switzerland. */
    | 'CH'
    /** Côte d’Ivoire. */
    | 'CI'
    /** Cook Islands. */
    | 'CK'
    /** Chile. */
    | 'CL'
    /** Cameroon. */
    | 'CM'
    /** China. */
    | 'CN'
    /** Colombia. */
    | 'CO'
    /** Costa Rica. */
    | 'CR'
    /** Cuba. */
    | 'CU'
    /** Cape Verde. */
    | 'CV'
    /** Curaçao. */
    | 'CW'
    /** Christmas Island. */
    | 'CX'
    /** Cyprus. */
    | 'CY'
    /** Czechia. */
    | 'CZ'
    /** Germany. */
    | 'DE'
    /** Djibouti. */
    | 'DJ'
    /** Denmark. */
    | 'DK'
    /** Dominica. */
    | 'DM'
    /** Dominican Republic. */
    | 'DO'
    /** Algeria. */
    | 'DZ'
    /** Ecuador. */
    | 'EC'
    /** Estonia. */
    | 'EE'
    /** Egypt. */
    | 'EG'
    /** Western Sahara. */
    | 'EH'
    /** Eritrea. */
    | 'ER'
    /** Spain. */
    | 'ES'
    /** Ethiopia. */
    | 'ET'
    /** Finland. */
    | 'FI'
    /** Fiji. */
    | 'FJ'
    /** Falkland Islands. */
    | 'FK'
    /** Faroe Islands. */
    | 'FO'
    /** France. */
    | 'FR'
    /** Gabon. */
    | 'GA'
    /** United Kingdom. */
    | 'GB'
    /** Grenada. */
    | 'GD'
    /** Georgia. */
    | 'GE'
    /** French Guiana. */
    | 'GF'
    /** Guernsey. */
    | 'GG'
    /** Ghana. */
    | 'GH'
    /** Gibraltar. */
    | 'GI'
    /** Greenland. */
    | 'GL'
    /** Gambia. */
    | 'GM'
    /** Guinea. */
    | 'GN'
    /** Guadeloupe. */
    | 'GP'
    /** Equatorial Guinea. */
    | 'GQ'
    /** Greece. */
    | 'GR'
    /** South Georgia & South Sandwich Islands. */
    | 'GS'
    /** Guatemala. */
    | 'GT'
    /** Guinea-Bissau. */
    | 'GW'
    /** Guyana. */
    | 'GY'
    /** Hong Kong SAR. */
    | 'HK'
    /** Heard & McDonald Islands. */
    | 'HM'
    /** Honduras. */
    | 'HN'
    /** Croatia. */
    | 'HR'
    /** Haiti. */
    | 'HT'
    /** Hungary. */
    | 'HU'
    /** Indonesia. */
    | 'ID'
    /** Ireland. */
    | 'IE'
    /** Israel. */
    | 'IL'
    /** Isle of Man. */
    | 'IM'
    /** India. */
    | 'IN'
    /** British Indian Ocean Territory. */
    | 'IO'
    /** Iraq. */
    | 'IQ'
    /** Iran. */
    | 'IR'
    /** Iceland. */
    | 'IS'
    /** Italy. */
    | 'IT'
    /** Jersey. */
    | 'JE'
    /** Jamaica. */
    | 'JM'
    /** Jordan. */
    | 'JO'
    /** Japan. */
    | 'JP'
    /** Kenya. */
    | 'KE'
    /** Kyrgyzstan. */
    | 'KG'
    /** Cambodia. */
    | 'KH'
    /** Kiribati. */
    | 'KI'
    /** Comoros. */
    | 'KM'
    /** St. Kitts & Nevis. */
    | 'KN'
    /** North Korea. */
    | 'KP'
    /** South Korea. */
    | 'KR'
    /** Kuwait. */
    | 'KW'
    /** Cayman Islands. */
    | 'KY'
    /** Kazakhstan. */
    | 'KZ'
    /** Laos. */
    | 'LA'
    /** Lebanon. */
    | 'LB'
    /** St. Lucia. */
    | 'LC'
    /** Liechtenstein. */
    | 'LI'
    /** Sri Lanka. */
    | 'LK'
    /** Liberia. */
    | 'LR'
    /** Lesotho. */
    | 'LS'
    /** Lithuania. */
    | 'LT'
    /** Luxembourg. */
    | 'LU'
    /** Latvia. */
    | 'LV'
    /** Libya. */
    | 'LY'
    /** Morocco. */
    | 'MA'
    /** Monaco. */
    | 'MC'
    /** Moldova. */
    | 'MD'
    /** Montenegro. */
    | 'ME'
    /** St. Martin. */
    | 'MF'
    /** Madagascar. */
    | 'MG'
    /** North Macedonia. */
    | 'MK'
    /** Mali. */
    | 'ML'
    /** Myanmar (Burma). */
    | 'MM'
    /** Mongolia. */
    | 'MN'
    /** Macao SAR. */
    | 'MO'
    /** Martinique. */
    | 'MQ'
    /** Mauritania. */
    | 'MR'
    /** Montserrat. */
    | 'MS'
    /** Malta. */
    | 'MT'
    /** Mauritius. */
    | 'MU'
    /** Maldives. */
    | 'MV'
    /** Malawi. */
    | 'MW'
    /** Mexico. */
    | 'MX'
    /** Malaysia. */
    | 'MY'
    /** Mozambique. */
    | 'MZ'
    /** Namibia. */
    | 'NA'
    /** New Caledonia. */
    | 'NC'
    /** Niger. */
    | 'NE'
    /** Norfolk Island. */
    | 'NF'
    /** Nigeria. */
    | 'NG'
    /** Nicaragua. */
    | 'NI'
    /** Netherlands. */
    | 'NL'
    /** Norway. */
    | 'NO'
    /** Nepal. */
    | 'NP'
    /** Nauru. */
    | 'NR'
    /** Niue. */
    | 'NU'
    /** New Zealand. */
    | 'NZ'
    /** Oman. */
    | 'OM'
    /** Panama. */
    | 'PA'
    /** Peru. */
    | 'PE'
    /** French Polynesia. */
    | 'PF'
    /** Papua New Guinea. */
    | 'PG'
    /** Philippines. */
    | 'PH'
    /** Pakistan. */
    | 'PK'
    /** Poland. */
    | 'PL'
    /** St. Pierre & Miquelon. */
    | 'PM'
    /** Pitcairn Islands. */
    | 'PN'
    /** Palestinian Territories. */
    | 'PS'
    /** Portugal. */
    | 'PT'
    /** Paraguay. */
    | 'PY'
    /** Qatar. */
    | 'QA'
    /** Réunion. */
    | 'RE'
    /** Romania. */
    | 'RO'
    /** Serbia. */
    | 'RS'
    /** Russia. */
    | 'RU'
    /** Rwanda. */
    | 'RW'
    /** Saudi Arabia. */
    | 'SA'
    /** Solomon Islands. */
    | 'SB'
    /** Seychelles. */
    | 'SC'
    /** Sudan. */
    | 'SD'
    /** Sweden. */
    | 'SE'
    /** Singapore. */
    | 'SG'
    /** St. Helena. */
    | 'SH'
    /** Slovenia. */
    | 'SI'
    /** Svalbard & Jan Mayen. */
    | 'SJ'
    /** Slovakia. */
    | 'SK'
    /** Sierra Leone. */
    | 'SL'
    /** San Marino. */
    | 'SM'
    /** Senegal. */
    | 'SN'
    /** Somalia. */
    | 'SO'
    /** Suriname. */
    | 'SR'
    /** South Sudan. */
    | 'SS'
    /** São Tomé & Príncipe. */
    | 'ST'
    /** El Salvador. */
    | 'SV'
    /** Sint Maarten. */
    | 'SX'
    /** Syria. */
    | 'SY'
    /** Eswatini. */
    | 'SZ'
    /** Tristan da Cunha. */
    | 'TA'
    /** Turks & Caicos Islands. */
    | 'TC'
    /** Chad. */
    | 'TD'
    /** French Southern Territories. */
    | 'TF'
    /** Togo. */
    | 'TG'
    /** Thailand. */
    | 'TH'
    /** Tajikistan. */
    | 'TJ'
    /** Tokelau. */
    | 'TK'
    /** Timor-Leste. */
    | 'TL'
    /** Turkmenistan. */
    | 'TM'
    /** Tunisia. */
    | 'TN'
    /** Tonga. */
    | 'TO'
    /** Türkiye. */
    | 'TR'
    /** Trinidad & Tobago. */
    | 'TT'
    /** Tuvalu. */
    | 'TV'
    /** Taiwan. */
    | 'TW'
    /** Tanzania. */
    | 'TZ'
    /** Ukraine. */
    | 'UA'
    /** Uganda. */
    | 'UG'
    /** U.S. Outlying Islands. */
    | 'UM'
    /** United States. */
    | 'US'
    /** Uruguay. */
    | 'UY'
    /** Uzbekistan. */
    | 'UZ'
    /** Vatican City. */
    | 'VA'
    /** St. Vincent & Grenadines. */
    | 'VC'
    /** Venezuela. */
    | 'VE'
    /** British Virgin Islands. */
    | 'VG'
    /** Vietnam. */
    | 'VN'
    /** Vanuatu. */
    | 'VU'
    /** Wallis & Futuna. */
    | 'WF'
    /** Samoa. */
    | 'WS'
    /** Kosovo. */
    | 'XK'
    /** Yemen. */
    | 'YE'
    /** Mayotte. */
    | 'YT'
    /** South Africa. */
    | 'ZA'
    /** Zambia. */
    | 'ZM'
    /** Zimbabwe. */
    | 'ZW'
    /** Unknown Region. */
    | 'ZZ';

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export type CurrencyCode =
    /** United Arab Emirates Dirham (AED). */
    | 'AED'
    /** Afghan Afghani (AFN). */
    | 'AFN'
    /** Albanian Lek (ALL). */
    | 'ALL'
    /** Armenian Dram (AMD). */
    | 'AMD'
    /** Netherlands Antillean Guilder. */
    | 'ANG'
    /** Angolan Kwanza (AOA). */
    | 'AOA'
    /** Argentine Pesos (ARS). */
    | 'ARS'
    /** Australian Dollars (AUD). */
    | 'AUD'
    /** Aruban Florin (AWG). */
    | 'AWG'
    /** Azerbaijani Manat (AZN). */
    | 'AZN'
    /** Bosnia and Herzegovina Convertible Mark (BAM). */
    | 'BAM'
    /** Barbadian Dollar (BBD). */
    | 'BBD'
    /** Bangladesh Taka (BDT). */
    | 'BDT'
    /** Bulgarian Lev (BGN). */
    | 'BGN'
    /** Bahraini Dinar (BHD). */
    | 'BHD'
    /** Burundian Franc (BIF). */
    | 'BIF'
    /** Bermudian Dollar (BMD). */
    | 'BMD'
    /** Brunei Dollar (BND). */
    | 'BND'
    /** Bolivian Boliviano (BOB). */
    | 'BOB'
    /** Brazilian Real (BRL). */
    | 'BRL'
    /** Bahamian Dollar (BSD). */
    | 'BSD'
    /** Bhutanese Ngultrum (BTN). */
    | 'BTN'
    /** Botswana Pula (BWP). */
    | 'BWP'
    /** Belarusian Ruble (BYN). */
    | 'BYN'
    /** Belarusian Ruble (BYR). */
    | 'BYR'
    /** Belize Dollar (BZD). */
    | 'BZD'
    /** Canadian Dollars (CAD). */
    | 'CAD'
    /** Congolese franc (CDF). */
    | 'CDF'
    /** Swiss Francs (CHF). */
    | 'CHF'
    /** Chilean Peso (CLP). */
    | 'CLP'
    /** Chinese Yuan Renminbi (CNY). */
    | 'CNY'
    /** Colombian Peso (COP). */
    | 'COP'
    /** Costa Rican Colones (CRC). */
    | 'CRC'
    /** Cape Verdean escudo (CVE). */
    | 'CVE'
    /** Czech Koruny (CZK). */
    | 'CZK'
    /** Djiboutian Franc (DJF). */
    | 'DJF'
    /** Danish Kroner (DKK). */
    | 'DKK'
    /** Dominican Peso (DOP). */
    | 'DOP'
    /** Algerian Dinar (DZD). */
    | 'DZD'
    /** Egyptian Pound (EGP). */
    | 'EGP'
    /** Eritrean Nakfa (ERN). */
    | 'ERN'
    /** Ethiopian Birr (ETB). */
    | 'ETB'
    /** Euro (EUR). */
    | 'EUR'
    /** Fijian Dollars (FJD). */
    | 'FJD'
    /** Falkland Islands Pounds (FKP). */
    | 'FKP'
    /** United Kingdom Pounds (GBP). */
    | 'GBP'
    /** Georgian Lari (GEL). */
    | 'GEL'
    /** Ghanaian Cedi (GHS). */
    | 'GHS'
    /** Gibraltar Pounds (GIP). */
    | 'GIP'
    /** Gambian Dalasi (GMD). */
    | 'GMD'
    /** Guinean Franc (GNF). */
    | 'GNF'
    /** Guatemalan Quetzal (GTQ). */
    | 'GTQ'
    /** Guyanese Dollar (GYD). */
    | 'GYD'
    /** Hong Kong Dollars (HKD). */
    | 'HKD'
    /** Honduran Lempira (HNL). */
    | 'HNL'
    /** Croatian Kuna (HRK). */
    | 'HRK'
    /** Haitian Gourde (HTG). */
    | 'HTG'
    /** Hungarian Forint (HUF). */
    | 'HUF'
    /** Indonesian Rupiah (IDR). */
    | 'IDR'
    /** Israeli New Shekel (NIS). */
    | 'ILS'
    /** Indian Rupees (INR). */
    | 'INR'
    /** Iraqi Dinar (IQD). */
    | 'IQD'
    /** Iranian Rial (IRR). */
    | 'IRR'
    /** Icelandic Kronur (ISK). */
    | 'ISK'
    /** Jersey Pound. */
    | 'JEP'
    /** Jamaican Dollars (JMD). */
    | 'JMD'
    /** Jordanian Dinar (JOD). */
    | 'JOD'
    /** Japanese Yen (JPY). */
    | 'JPY'
    /** Kenyan Shilling (KES). */
    | 'KES'
    /** Kyrgyzstani Som (KGS). */
    | 'KGS'
    /** Cambodian Riel. */
    | 'KHR'
    /** Kiribati Dollar (KID). */
    | 'KID'
    /** Comorian Franc (KMF). */
    | 'KMF'
    /** South Korean Won (KRW). */
    | 'KRW'
    /** Kuwaiti Dinar (KWD). */
    | 'KWD'
    /** Cayman Dollars (KYD). */
    | 'KYD'
    /** Kazakhstani Tenge (KZT). */
    | 'KZT'
    /** Laotian Kip (LAK). */
    | 'LAK'
    /** Lebanese Pounds (LBP). */
    | 'LBP'
    /** Sri Lankan Rupees (LKR). */
    | 'LKR'
    /** Liberian Dollar (LRD). */
    | 'LRD'
    /** Lesotho Loti (LSL). */
    | 'LSL'
    /** Lithuanian Litai (LTL). */
    | 'LTL'
    /** Latvian Lati (LVL). */
    | 'LVL'
    /** Libyan Dinar (LYD). */
    | 'LYD'
    /** Moroccan Dirham. */
    | 'MAD'
    /** Moldovan Leu (MDL). */
    | 'MDL'
    /** Malagasy Ariary (MGA). */
    | 'MGA'
    /** Macedonia Denar (MKD). */
    | 'MKD'
    /** Burmese Kyat (MMK). */
    | 'MMK'
    /** Mongolian Tugrik. */
    | 'MNT'
    /** Macanese Pataca (MOP). */
    | 'MOP'
    /** Mauritanian Ouguiya (MRU). */
    | 'MRU'
    /** Mauritian Rupee (MUR). */
    | 'MUR'
    /** Maldivian Rufiyaa (MVR). */
    | 'MVR'
    /** Malawian Kwacha (MWK). */
    | 'MWK'
    /** Mexican Pesos (MXN). */
    | 'MXN'
    /** Malaysian Ringgits (MYR). */
    | 'MYR'
    /** Mozambican Metical. */
    | 'MZN'
    /** Namibian Dollar. */
    | 'NAD'
    /** Nigerian Naira (NGN). */
    | 'NGN'
    /** Nicaraguan Córdoba (NIO). */
    | 'NIO'
    /** Norwegian Kroner (NOK). */
    | 'NOK'
    /** Nepalese Rupee (NPR). */
    | 'NPR'
    /** New Zealand Dollars (NZD). */
    | 'NZD'
    /** Omani Rial (OMR). */
    | 'OMR'
    /** Panamian Balboa (PAB). */
    | 'PAB'
    /** Peruvian Nuevo Sol (PEN). */
    | 'PEN'
    /** Papua New Guinean Kina (PGK). */
    | 'PGK'
    /** Philippine Peso (PHP). */
    | 'PHP'
    /** Pakistani Rupee (PKR). */
    | 'PKR'
    /** Polish Zlotych (PLN). */
    | 'PLN'
    /** Paraguayan Guarani (PYG). */
    | 'PYG'
    /** Qatari Rial (QAR). */
    | 'QAR'
    /** Romanian Lei (RON). */
    | 'RON'
    /** Serbian dinar (RSD). */
    | 'RSD'
    /** Russian Rubles (RUB). */
    | 'RUB'
    /** Rwandan Franc (RWF). */
    | 'RWF'
    /** Saudi Riyal (SAR). */
    | 'SAR'
    /** Solomon Islands Dollar (SBD). */
    | 'SBD'
    /** Seychellois Rupee (SCR). */
    | 'SCR'
    /** Sudanese Pound (SDG). */
    | 'SDG'
    /** Swedish Kronor (SEK). */
    | 'SEK'
    /** Singapore Dollars (SGD). */
    | 'SGD'
    /** Saint Helena Pounds (SHP). */
    | 'SHP'
    /** Sierra Leonean Leone (SLL). */
    | 'SLL'
    /** Somali Shilling (SOS). */
    | 'SOS'
    /** Surinamese Dollar (SRD). */
    | 'SRD'
    /** South Sudanese Pound (SSP). */
    | 'SSP'
    /** Sao Tome And Principe Dobra (STD). */
    | 'STD'
    /** Sao Tome And Principe Dobra (STN). */
    | 'STN'
    /** Syrian Pound (SYP). */
    | 'SYP'
    /** Swazi Lilangeni (SZL). */
    | 'SZL'
    /** Thai baht (THB). */
    | 'THB'
    /** Tajikistani Somoni (TJS). */
    | 'TJS'
    /** Turkmenistani Manat (TMT). */
    | 'TMT'
    /** Tunisian Dinar (TND). */
    | 'TND'
    /** Tongan Pa'anga (TOP). */
    | 'TOP'
    /** Turkish Lira (TRY). */
    | 'TRY'
    /** Trinidad and Tobago Dollars (TTD). */
    | 'TTD'
    /** Taiwan Dollars (TWD). */
    | 'TWD'
    /** Tanzanian Shilling (TZS). */
    | 'TZS'
    /** Ukrainian Hryvnia (UAH). */
    | 'UAH'
    /** Ugandan Shilling (UGX). */
    | 'UGX'
    /** United States Dollars (USD). */
    | 'USD'
    /** Uruguayan Pesos (UYU). */
    | 'UYU'
    /** Uzbekistan som (UZS). */
    | 'UZS'
    /** Venezuelan Bolivares (VED). */
    | 'VED'
    /** Venezuelan Bolivares (VEF). */
    | 'VEF'
    /** Venezuelan Bolivares Soberanos (VES). */
    | 'VES'
    /** Vietnamese đồng (VND). */
    | 'VND'
    /** Vanuatu Vatu (VUV). */
    | 'VUV'
    /** Samoan Tala (WST). */
    | 'WST'
    /** Central African CFA Franc (XAF). */
    | 'XAF'
    /** East Caribbean Dollar (XCD). */
    | 'XCD'
    /** West African CFA franc (XOF). */
    | 'XOF'
    /** CFP Franc (XPF). */
    | 'XPF'
    /** Unrecognized currency. */
    | 'XXX'
    /** Yemeni Rial (YER). */
    | 'YER'
    /** South African Rand (ZAR). */
    | 'ZAR'
    /** Zambian Kwacha (ZMW). */
    | 'ZMW';

/**
 * Supported languages for retrieving translated storefront content. Pass a language code to the [`@inContext`](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/in-context) directive to return product titles, descriptions, and other translatable fields in that language.
 *
 * The [`Localization`](https://shopify.dev/docs/api/storefront/current/objects/Localization) object provides the list of available languages for the active country, and each [`Country`](https://shopify.dev/docs/api/storefront/current/objects/Country) in [`availableCountries`](https://shopify.dev/docs/api/storefront/current/objects/Localization#field-Localization.fields.availableCountries) includes its own available languages.
 *
 */
export type LanguageCode =
    /** Afrikaans. */
    | 'AF'
    /** Akan. */
    | 'AK'
    /** Amharic. */
    | 'AM'
    /** Arabic. */
    | 'AR'
    /** Assamese. */
    | 'AS'
    /** Azerbaijani. */
    | 'AZ'
    /** Belarusian. */
    | 'BE'
    /** Bulgarian. */
    | 'BG'
    /** Bambara. */
    | 'BM'
    /** Bangla. */
    | 'BN'
    /** Tibetan. */
    | 'BO'
    /** Breton. */
    | 'BR'
    /** Bosnian. */
    | 'BS'
    /** Catalan. */
    | 'CA'
    /** Chechen. */
    | 'CE'
    /** Central Kurdish. */
    | 'CKB'
    /** Czech. */
    | 'CS'
    /** Church Slavic. */
    | 'CU'
    /** Welsh. */
    | 'CY'
    /** Danish. */
    | 'DA'
    /** German. */
    | 'DE'
    /** Dzongkha. */
    | 'DZ'
    /** Ewe. */
    | 'EE'
    /** Greek. */
    | 'EL'
    /** English. */
    | 'EN'
    /** Esperanto. */
    | 'EO'
    /** Spanish. */
    | 'ES'
    /** Estonian. */
    | 'ET'
    /** Basque. */
    | 'EU'
    /** Persian. */
    | 'FA'
    /** Fulah. */
    | 'FF'
    /** Finnish. */
    | 'FI'
    /** Filipino. */
    | 'FIL'
    /** Faroese. */
    | 'FO'
    /** French. */
    | 'FR'
    /** Western Frisian. */
    | 'FY'
    /** Irish. */
    | 'GA'
    /** Scottish Gaelic. */
    | 'GD'
    /** Galician. */
    | 'GL'
    /** Gujarati. */
    | 'GU'
    /** Manx. */
    | 'GV'
    /** Hausa. */
    | 'HA'
    /** Hebrew. */
    | 'HE'
    /** Hindi. */
    | 'HI'
    /** Croatian. */
    | 'HR'
    /** Hungarian. */
    | 'HU'
    /** Armenian. */
    | 'HY'
    /** Interlingua. */
    | 'IA'
    /** Indonesian. */
    | 'ID'
    /** Igbo. */
    | 'IG'
    /** Sichuan Yi. */
    | 'II'
    /** Icelandic. */
    | 'IS'
    /** Italian. */
    | 'IT'
    /** Japanese. */
    | 'JA'
    /** Javanese. */
    | 'JV'
    /** Georgian. */
    | 'KA'
    /** Kikuyu. */
    | 'KI'
    /** Kazakh. */
    | 'KK'
    /** Kalaallisut. */
    | 'KL'
    /** Khmer. */
    | 'KM'
    /** Kannada. */
    | 'KN'
    /** Korean. */
    | 'KO'
    /** Kashmiri. */
    | 'KS'
    /** Kurdish. */
    | 'KU'
    /** Cornish. */
    | 'KW'
    /** Kyrgyz. */
    | 'KY'
    /** Latin. */
    | 'LA'
    /** Luxembourgish. */
    | 'LB'
    /** Ganda. */
    | 'LG'
    /** Lingala. */
    | 'LN'
    /** Lao. */
    | 'LO'
    /** Lithuanian. */
    | 'LT'
    /** Luba-Katanga. */
    | 'LU'
    /** Latvian. */
    | 'LV'
    /** Malagasy. */
    | 'MG'
    /** Māori. */
    | 'MI'
    /** Macedonian. */
    | 'MK'
    /** Malayalam. */
    | 'ML'
    /** Mongolian. */
    | 'MN'
    /** Moldavian. */
    | 'MO'
    /** Marathi. */
    | 'MR'
    /** Malay. */
    | 'MS'
    /** Maltese. */
    | 'MT'
    /** Burmese. */
    | 'MY'
    /** Norwegian (Bokmål). */
    | 'NB'
    /** North Ndebele. */
    | 'ND'
    /** Nepali. */
    | 'NE'
    /** Dutch. */
    | 'NL'
    /** Norwegian Nynorsk. */
    | 'NN'
    /** Norwegian. */
    | 'NO'
    /** Oromo. */
    | 'OM'
    /** Odia. */
    | 'OR'
    /** Ossetic. */
    | 'OS'
    /** Punjabi. */
    | 'PA'
    /** Polish. */
    | 'PL'
    /** Pashto. */
    | 'PS'
    /** Portuguese. */
    | 'PT'
    /** Portuguese (Brazil). */
    | 'PT_BR'
    /** Portuguese (Portugal). */
    | 'PT_PT'
    /** Quechua. */
    | 'QU'
    /** Romansh. */
    | 'RM'
    /** Rundi. */
    | 'RN'
    /** Romanian. */
    | 'RO'
    /** Russian. */
    | 'RU'
    /** Kinyarwanda. */
    | 'RW'
    /** Sanskrit. */
    | 'SA'
    /** Sardinian. */
    | 'SC'
    /** Sindhi. */
    | 'SD'
    /** Northern Sami. */
    | 'SE'
    /** Sango. */
    | 'SG'
    /** Serbo-Croatian. */
    | 'SH'
    /** Sinhala. */
    | 'SI'
    /** Slovak. */
    | 'SK'
    /** Slovenian. */
    | 'SL'
    /** Shona. */
    | 'SN'
    /** Somali. */
    | 'SO'
    /** Albanian. */
    | 'SQ'
    /** Serbian. */
    | 'SR'
    /** Sundanese. */
    | 'SU'
    /** Swedish. */
    | 'SV'
    /** Swahili. */
    | 'SW'
    /** Tamil. */
    | 'TA'
    /** Telugu. */
    | 'TE'
    /** Tajik. */
    | 'TG'
    /** Thai. */
    | 'TH'
    /** Tigrinya. */
    | 'TI'
    /** Turkmen. */
    | 'TK'
    /** Tongan. */
    | 'TO'
    /** Turkish. */
    | 'TR'
    /** Tatar. */
    | 'TT'
    /** Uyghur. */
    | 'UG'
    /** Ukrainian. */
    | 'UK'
    /** Urdu. */
    | 'UR'
    /** Uzbek. */
    | 'UZ'
    /** Vietnamese. */
    | 'VI'
    /** Volapük. */
    | 'VO'
    /** Wolof. */
    | 'WO'
    /** Xhosa. */
    | 'XH'
    /** Yiddish. */
    | 'YI'
    /** Yoruba. */
    | 'YO'
    /** Chinese. */
    | 'ZH'
    /** Chinese (Simplified). */
    | 'ZH_CN'
    /** Chinese (Traditional). */
    | 'ZH_TW'
    /** Zulu. */
    | 'ZU';

export type CartFieldsFragment = {
    id: string;
    totalQuantity: number;
    cost: { subtotalAmount: { amount: string; currencyCode: CurrencyCode } };
    lines: {
        nodes: Array<
            | {
                  id: string;
                  quantity: number;
                  attributes: Array<{ key: string; value: string | null }>;
                  cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                  merchandise: {
                      id: string;
                      product: {
                          title: string;
                          vendor: string;
                          featuredImage: { url: string } | null;
                      };
                  };
              }
            | {
                  id: string;
                  quantity: number;
                  attributes: Array<{ key: string; value: string | null }>;
                  cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                  merchandise: {
                      id: string;
                      product: {
                          title: string;
                          vendor: string;
                          featuredImage: { url: string } | null;
                      };
                  };
              }
        >;
    };
};

export type CartCreateMutationVariables = Exact<{
    language: LanguageCode;
    country: CountryCode;
}>;

export type CartCreateMutation = {
    cartCreate: {
        cart: {
            id: string;
            totalQuantity: number;
            cost: { subtotalAmount: { amount: string; currencyCode: CurrencyCode } };
            lines: {
                nodes: Array<
                    | {
                          id: string;
                          quantity: number;
                          attributes: Array<{ key: string; value: string | null }>;
                          cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                          merchandise: {
                              id: string;
                              product: {
                                  title: string;
                                  vendor: string;
                                  featuredImage: { url: string } | null;
                              };
                          };
                      }
                    | {
                          id: string;
                          quantity: number;
                          attributes: Array<{ key: string; value: string | null }>;
                          cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                          merchandise: {
                              id: string;
                              product: {
                                  title: string;
                                  vendor: string;
                                  featuredImage: { url: string } | null;
                              };
                          };
                      }
                >;
            };
        } | null;
        userErrors: Array<{ message: string }>;
    } | null;
};

export type CartLinesAddMutationVariables = Exact<{
    cartId: string | number;
    lines: Array<CartLineInput> | CartLineInput;
    language: LanguageCode;
    country: CountryCode;
}>;

export type CartLinesAddMutation = {
    cartLinesAdd: {
        cart: {
            id: string;
            totalQuantity: number;
            cost: { subtotalAmount: { amount: string; currencyCode: CurrencyCode } };
            lines: {
                nodes: Array<
                    | {
                          id: string;
                          quantity: number;
                          attributes: Array<{ key: string; value: string | null }>;
                          cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                          merchandise: {
                              id: string;
                              product: {
                                  title: string;
                                  vendor: string;
                                  featuredImage: { url: string } | null;
                              };
                          };
                      }
                    | {
                          id: string;
                          quantity: number;
                          attributes: Array<{ key: string; value: string | null }>;
                          cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                          merchandise: {
                              id: string;
                              product: {
                                  title: string;
                                  vendor: string;
                                  featuredImage: { url: string } | null;
                              };
                          };
                      }
                >;
            };
        } | null;
        userErrors: Array<{ message: string }>;
    } | null;
};

export type CartBuyerIdentityUpdateMutationVariables = Exact<{
    cartId: string | number;
    language: LanguageCode;
    country: CountryCode;
}>;

export type CartBuyerIdentityUpdateMutation = {
    cartBuyerIdentityUpdate: {
        cart: {
            id: string;
            totalQuantity: number;
            cost: { subtotalAmount: { amount: string; currencyCode: CurrencyCode } };
            lines: {
                nodes: Array<
                    | {
                          id: string;
                          quantity: number;
                          attributes: Array<{ key: string; value: string | null }>;
                          cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                          merchandise: {
                              id: string;
                              product: {
                                  title: string;
                                  vendor: string;
                                  featuredImage: { url: string } | null;
                              };
                          };
                      }
                    | {
                          id: string;
                          quantity: number;
                          attributes: Array<{ key: string; value: string | null }>;
                          cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                          merchandise: {
                              id: string;
                              product: {
                                  title: string;
                                  vendor: string;
                                  featuredImage: { url: string } | null;
                              };
                          };
                      }
                >;
            };
        } | null;
        userErrors: Array<{ message: string }>;
    } | null;
};

export type CartQueryVariables = Exact<{
    cartId: string | number;
    language: LanguageCode;
    country: CountryCode;
}>;

export type CartQuery = {
    cart: {
        id: string;
        totalQuantity: number;
        cost: { subtotalAmount: { amount: string; currencyCode: CurrencyCode } };
        lines: {
            nodes: Array<
                | {
                      id: string;
                      quantity: number;
                      attributes: Array<{ key: string; value: string | null }>;
                      cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                      merchandise: {
                          id: string;
                          product: {
                              title: string;
                              vendor: string;
                              featuredImage: { url: string } | null;
                          };
                      };
                  }
                | {
                      id: string;
                      quantity: number;
                      attributes: Array<{ key: string; value: string | null }>;
                      cost: { totalAmount: { amount: string; currencyCode: CurrencyCode } };
                      merchandise: {
                          id: string;
                          product: {
                              title: string;
                              vendor: string;
                              featuredImage: { url: string } | null;
                          };
                      };
                  }
            >;
        };
    } | null;
};

export type LocalizationQueryVariables = Exact<{ [key: string]: never }>;

export type LocalizationQuery = {
    localization: {
        availableCountries: Array<{
            availableLanguages: Array<{ isoCode: LanguageCode; endonymName: string }>;
        }>;
    };
};

export type ProductDetailQueryVariables = Exact<{
    id: string | number;
    language: LanguageCode;
    country: CountryCode;
}>;

export type ProductDetailQuery = {
    product: {
        id: string;
        title: string;
        vendor: string;
        featuredImage: {
            url: string;
            altText: string | null;
            width: number | null;
            height: number | null;
        } | null;
        variants: {
            nodes: Array<{
                id: string;
                availableForSale: boolean;
                price: { amount: string; currencyCode: CurrencyCode };
                compareAtPrice: { amount: string; currencyCode: CurrencyCode } | null;
            }>;
        };
    } | null;
};

export const CartFieldsFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'CartFields' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Cart' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'totalQuantity' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cost' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subtotalAmount' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'amount' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'currencyCode' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lines' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: { kind: 'IntValue', value: '50' }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'quantity' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'attributes' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'key' }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'value' }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cost' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'totalAmount'
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'amount'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'currencyCode'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'merchandise' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'InlineFragment',
                                                            typeCondition: {
                                                                kind: 'NamedType',
                                                                name: {
                                                                    kind: 'Name',
                                                                    value: 'ProductVariant'
                                                                }
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'product'
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'title'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'vendor'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'featuredImage'
                                                                                    },
                                                                                    selectionSet: {
                                                                                        kind: 'SelectionSet',
                                                                                        selections:
                                                                                            [
                                                                                                {
                                                                                                    kind: 'Field',
                                                                                                    name: {
                                                                                                        kind: 'Name',
                                                                                                        value: 'url'
                                                                                                    },
                                                                                                    arguments:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: 'Argument',
                                                                                                                name: {
                                                                                                                    kind: 'Name',
                                                                                                                    value: 'transform'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    kind: 'ObjectValue',
                                                                                                                    fields: [
                                                                                                                        {
                                                                                                                            kind: 'ObjectField',
                                                                                                                            name: {
                                                                                                                                kind: 'Name',
                                                                                                                                value: 'maxWidth'
                                                                                                                            },
                                                                                                                            value: {
                                                                                                                                kind: 'IntValue',
                                                                                                                                value: '160'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                }
                                                                                            ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
} as unknown as DocumentNode<CartFieldsFragment, unknown>;
export const CartCreateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CartCreate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'language' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'LanguageCode' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'country' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CountryCode' } }
                    }
                }
            ],
            directives: [
                {
                    kind: 'Directive',
                    name: { kind: 'Name', value: 'inContext' },
                    arguments: [
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'language' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'language' } }
                        },
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'country' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'country' } }
                        }
                    ]
                }
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartCreate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                        {
                                            kind: 'ObjectField',
                                            name: { kind: 'Name', value: 'buyerIdentity' },
                                            value: {
                                                kind: 'ObjectValue',
                                                fields: [
                                                    {
                                                        kind: 'ObjectField',
                                                        name: {
                                                            kind: 'Name',
                                                            value: 'countryCode'
                                                        },
                                                        value: {
                                                            kind: 'Variable',
                                                            name: { kind: 'Name', value: 'country' }
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'cart' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'CartFields' }
                                            }
                                        ]
                                    }
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'userErrors' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'message' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'CartFields' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Cart' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'totalQuantity' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cost' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subtotalAmount' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'amount' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'currencyCode' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lines' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: { kind: 'IntValue', value: '50' }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'quantity' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'attributes' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'key' }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'value' }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cost' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'totalAmount'
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'amount'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'currencyCode'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'merchandise' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'InlineFragment',
                                                            typeCondition: {
                                                                kind: 'NamedType',
                                                                name: {
                                                                    kind: 'Name',
                                                                    value: 'ProductVariant'
                                                                }
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'product'
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'title'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'vendor'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'featuredImage'
                                                                                    },
                                                                                    selectionSet: {
                                                                                        kind: 'SelectionSet',
                                                                                        selections:
                                                                                            [
                                                                                                {
                                                                                                    kind: 'Field',
                                                                                                    name: {
                                                                                                        kind: 'Name',
                                                                                                        value: 'url'
                                                                                                    },
                                                                                                    arguments:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: 'Argument',
                                                                                                                name: {
                                                                                                                    kind: 'Name',
                                                                                                                    value: 'transform'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    kind: 'ObjectValue',
                                                                                                                    fields: [
                                                                                                                        {
                                                                                                                            kind: 'ObjectField',
                                                                                                                            name: {
                                                                                                                                kind: 'Name',
                                                                                                                                value: 'maxWidth'
                                                                                                                            },
                                                                                                                            value: {
                                                                                                                                kind: 'IntValue',
                                                                                                                                value: '160'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                }
                                                                                            ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
} as unknown as DocumentNode<CartCreateMutation, CartCreateMutationVariables>;
export const CartLinesAddDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CartLinesAdd' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'lines' } },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'ListType',
                            type: {
                                kind: 'NonNullType',
                                type: {
                                    kind: 'NamedType',
                                    name: { kind: 'Name', value: 'CartLineInput' }
                                }
                            }
                        }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'language' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'LanguageCode' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'country' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CountryCode' } }
                    }
                }
            ],
            directives: [
                {
                    kind: 'Directive',
                    name: { kind: 'Name', value: 'inContext' },
                    arguments: [
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'language' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'language' } }
                        },
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'country' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'country' } }
                        }
                    ]
                }
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartLinesAdd' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'cartId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } }
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'lines' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'lines' } }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'cart' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'CartFields' }
                                            }
                                        ]
                                    }
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'userErrors' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'message' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'CartFields' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Cart' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'totalQuantity' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cost' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subtotalAmount' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'amount' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'currencyCode' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lines' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: { kind: 'IntValue', value: '50' }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'quantity' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'attributes' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'key' }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'value' }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cost' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'totalAmount'
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'amount'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'currencyCode'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'merchandise' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'InlineFragment',
                                                            typeCondition: {
                                                                kind: 'NamedType',
                                                                name: {
                                                                    kind: 'Name',
                                                                    value: 'ProductVariant'
                                                                }
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'product'
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'title'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'vendor'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'featuredImage'
                                                                                    },
                                                                                    selectionSet: {
                                                                                        kind: 'SelectionSet',
                                                                                        selections:
                                                                                            [
                                                                                                {
                                                                                                    kind: 'Field',
                                                                                                    name: {
                                                                                                        kind: 'Name',
                                                                                                        value: 'url'
                                                                                                    },
                                                                                                    arguments:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: 'Argument',
                                                                                                                name: {
                                                                                                                    kind: 'Name',
                                                                                                                    value: 'transform'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    kind: 'ObjectValue',
                                                                                                                    fields: [
                                                                                                                        {
                                                                                                                            kind: 'ObjectField',
                                                                                                                            name: {
                                                                                                                                kind: 'Name',
                                                                                                                                value: 'maxWidth'
                                                                                                                            },
                                                                                                                            value: {
                                                                                                                                kind: 'IntValue',
                                                                                                                                value: '160'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                }
                                                                                            ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
} as unknown as DocumentNode<CartLinesAddMutation, CartLinesAddMutationVariables>;
export const CartBuyerIdentityUpdateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CartBuyerIdentityUpdate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'language' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'LanguageCode' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'country' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CountryCode' } }
                    }
                }
            ],
            directives: [
                {
                    kind: 'Directive',
                    name: { kind: 'Name', value: 'inContext' },
                    arguments: [
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'language' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'language' } }
                        },
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'country' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'country' } }
                        }
                    ]
                }
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cartBuyerIdentityUpdate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'cartId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } }
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'buyerIdentity' },
                                value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                        {
                                            kind: 'ObjectField',
                                            name: { kind: 'Name', value: 'countryCode' },
                                            value: {
                                                kind: 'Variable',
                                                name: { kind: 'Name', value: 'country' }
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'cart' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'CartFields' }
                                            }
                                        ]
                                    }
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'userErrors' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'message' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'CartFields' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Cart' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'totalQuantity' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cost' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subtotalAmount' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'amount' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'currencyCode' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lines' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: { kind: 'IntValue', value: '50' }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'quantity' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'attributes' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'key' }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'value' }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cost' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'totalAmount'
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'amount'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'currencyCode'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'merchandise' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'InlineFragment',
                                                            typeCondition: {
                                                                kind: 'NamedType',
                                                                name: {
                                                                    kind: 'Name',
                                                                    value: 'ProductVariant'
                                                                }
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'product'
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'title'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'vendor'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'featuredImage'
                                                                                    },
                                                                                    selectionSet: {
                                                                                        kind: 'SelectionSet',
                                                                                        selections:
                                                                                            [
                                                                                                {
                                                                                                    kind: 'Field',
                                                                                                    name: {
                                                                                                        kind: 'Name',
                                                                                                        value: 'url'
                                                                                                    },
                                                                                                    arguments:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: 'Argument',
                                                                                                                name: {
                                                                                                                    kind: 'Name',
                                                                                                                    value: 'transform'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    kind: 'ObjectValue',
                                                                                                                    fields: [
                                                                                                                        {
                                                                                                                            kind: 'ObjectField',
                                                                                                                            name: {
                                                                                                                                kind: 'Name',
                                                                                                                                value: 'maxWidth'
                                                                                                                            },
                                                                                                                            value: {
                                                                                                                                kind: 'IntValue',
                                                                                                                                value: '160'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                }
                                                                                            ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
} as unknown as DocumentNode<
    CartBuyerIdentityUpdateMutation,
    CartBuyerIdentityUpdateMutationVariables
>;
export const CartDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Cart' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'language' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'LanguageCode' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'country' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CountryCode' } }
                    }
                }
            ],
            directives: [
                {
                    kind: 'Directive',
                    name: { kind: 'Name', value: 'inContext' },
                    arguments: [
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'language' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'language' } }
                        },
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'country' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'country' } }
                        }
                    ]
                }
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cart' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'CartFields' }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'CartFields' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Cart' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'totalQuantity' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cost' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subtotalAmount' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'amount' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'currencyCode' }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lines' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'first' },
                                value: { kind: 'IntValue', value: '50' }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'quantity' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'attributes' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'key' }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'value' }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'cost' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'totalAmount'
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'amount'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'currencyCode'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'merchandise' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'InlineFragment',
                                                            typeCondition: {
                                                                kind: 'NamedType',
                                                                name: {
                                                                    kind: 'Name',
                                                                    value: 'ProductVariant'
                                                                }
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'id'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'product'
                                                                        },
                                                                        selectionSet: {
                                                                            kind: 'SelectionSet',
                                                                            selections: [
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'title'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'vendor'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    kind: 'Field',
                                                                                    name: {
                                                                                        kind: 'Name',
                                                                                        value: 'featuredImage'
                                                                                    },
                                                                                    selectionSet: {
                                                                                        kind: 'SelectionSet',
                                                                                        selections:
                                                                                            [
                                                                                                {
                                                                                                    kind: 'Field',
                                                                                                    name: {
                                                                                                        kind: 'Name',
                                                                                                        value: 'url'
                                                                                                    },
                                                                                                    arguments:
                                                                                                        [
                                                                                                            {
                                                                                                                kind: 'Argument',
                                                                                                                name: {
                                                                                                                    kind: 'Name',
                                                                                                                    value: 'transform'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    kind: 'ObjectValue',
                                                                                                                    fields: [
                                                                                                                        {
                                                                                                                            kind: 'ObjectField',
                                                                                                                            name: {
                                                                                                                                kind: 'Name',
                                                                                                                                value: 'maxWidth'
                                                                                                                            },
                                                                                                                            value: {
                                                                                                                                kind: 'IntValue',
                                                                                                                                value: '160'
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                }
                                                                                            ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
} as unknown as DocumentNode<CartQuery, CartQueryVariables>;
export const LocalizationDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Localization' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'localization' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'availableCountries' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'availableLanguages' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'isoCode' }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'endonymName'
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
} as unknown as DocumentNode<LocalizationQuery, LocalizationQueryVariables>;
export const ProductDetailDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'ProductDetail' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'language' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'LanguageCode' } }
                    }
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'country' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CountryCode' } }
                    }
                }
            ],
            directives: [
                {
                    kind: 'Directive',
                    name: { kind: 'Name', value: 'inContext' },
                    arguments: [
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'language' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'language' } }
                        },
                        {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'country' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'country' } }
                        }
                    ]
                }
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
                            }
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'vendor' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'featuredImage' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'url' },
                                                arguments: [
                                                    {
                                                        kind: 'Argument',
                                                        name: { kind: 'Name', value: 'transform' },
                                                        value: {
                                                            kind: 'ObjectValue',
                                                            fields: [
                                                                {
                                                                    kind: 'ObjectField',
                                                                    name: {
                                                                        kind: 'Name',
                                                                        value: 'maxWidth'
                                                                    },
                                                                    value: {
                                                                        kind: 'IntValue',
                                                                        value: '800'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'altText' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'width' }
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'height' }
                                            }
                                        ]
                                    }
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'variants' },
                                    arguments: [
                                        {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'first' },
                                            value: { kind: 'IntValue', value: '1' }
                                        }
                                    ],
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'nodes' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'id' }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'availableForSale'
                                                            }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'price' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'amount'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'currencyCode'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: {
                                                                kind: 'Name',
                                                                value: 'compareAtPrice'
                                                            },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'amount'
                                                                        }
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: {
                                                                            kind: 'Name',
                                                                            value: 'currencyCode'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
} as unknown as DocumentNode<ProductDetailQuery, ProductDetailQueryVariables>;
