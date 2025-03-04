export interface IOneFilter {
    iso: string;
    name: string;
}

export interface IOptions {
    numOfRows: number;
    pageNo: number;
    filter: IOneFilter | null;
}

export interface ICountryMap {
    content_ty: string;
    country_eng_nm: string;
    country_iso_alp2: string;
    country_nm: string;
    download_url: string;
    origin_file_nm: string;
}

export interface ICountryEnv {
    country_eng_nm: string;
    country_iso_alp2: string;
    country_nm: string;
    year: number;
    employment_rate: string;
    clean_water_use_rate: number;
    consumer_price_idx: number;
    tuber_pr_hndrd_thsnd_ppl_outbreak_rate: number;
    unemployment_rate: number;
}

export interface IDeplomacyList {
    country_eng_nm: string;
    country_iso_alp2: string;
    country_nm: string;
    diplomatic_relations: string;
    import_amount: string;
    export_amount: string;
    investment_status: string;
    mission_status: string;
    oda_status: string;
    oks_status: string;
}

export interface ICountryEconomy {
    country_eng_nm: string;
    country_iso_alp2: string;
    country_nm: string;
    ctypln_policy_cn: unknown | null;
    ecnmy_growth_rate: number;
    import_amount: number;
    import_amount_src: string;
    export_amount: number;
    export_amount_src: string;
    ext_debt: number;
    foreign_currency_reserve: string;
    gdp: string;
    gdp_per_capita: string;
    gdp_src: string;
    infltn_rate: number;
    invt_sts_cn: string;
    main_indust_cn: string;
    main_resource_cn: string;
    oda_sts_cn: string;
    pltcl_state_cn: string;
    remark: string;
    trade_export_prdnm_cn: number;
    trade_imcome_prdnm_cn: number;
    trade_year: number;
    unemploy_rate: number;
    unemploy_rate_year: number;
    written_year: number;
}

export interface ICountryMap {
    content_ty: string;
    country_eng_nm: string;
    country_iso_alp2: string;
    country_nm: string;
    download_url: string;
    origin_file_nm: string;
}

export interface ICountryEnv {
    country_eng_nm: string;
    country_iso_alp2: string;
    country_nm: string;
    year: number;
    employment_rate: string;
    clean_water_use_rate: number;
    consumer_price_idx: number;
    tuber_pr_hndrd_thsnd_ppl_outbreak_rate: number;
    unemployment_rate: number;
}

export interface IResultCode<T> {
    currentCount: number;
    data: T[];
    numOfRows: number;
    pageNo: number;
    resultCode: number;
    resultMsg: string;
    totalCount: number;
}
export interface ICountryList {
    name: string;
    Iso2: string;
    Iso3: string;
}

export interface ICountryObject {
    altSpellings: string[];
    area: number;
    capital: number[];
    car: {
        signs: string[];
        side: string;
    };
    cca2: string;
    cca3: string;
    ccn3: string;
    cioc: string;
    coatOfArms: {
        png: string;
        svg: string;
    };
    continents: string[];
    currencies: {
        ISK: { name: string; symbol: string };
    };
    demonyms: {
        eng: { f: string; m: string };
        fra: { f: string; m: string };
    };
    fifa: string;
    flag: string;
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    gini: {
        2017: string;
    };
    idd: { root: string; suffixes: number[] };
    independent: boolean;
    landlocked: boolean;
    languages: { isl: string };
    latlng: number[];
    maps: { googleMaps: string; openStreetMaps: string };
    name: {
        common: string;
        official: string;
        nativeName: {
            isl: { official: string; common: string };
        };
    };
    population: number;
    postalCode: { format: string; regex: string };
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: {
        ara: { official: string; common: string };
        bre: { official: string; common: string };
        ces: { official: string; common: string };
        cym: { official: string; common: string };
        deu: { official: string; common: string };
        est: { official: string; common: string };
        fin: { official: string; common: string };
        fra: { official: string; common: string };
        hrv: { official: string; common: string };
        hun: { official: string; common: string };
        ita: { official: string; common: string };
        kor: { official: string; common: string };
        jpn: { official: string; common: string };
        nld: { official: string; common: string };
        per: { official: string; common: string };
        pol: { official: string; common: string };
        por: { official: string; common: string };
        rus: { official: string; common: string };
        slk: { official: string; common: string };
        spa: { official: string; common: string };
        srp: { official: string; common: string };
        swe: { official: string; common: string };
        tur: { official: string; common: string };
        urd: { official: string; common: string };
        zho: { official: string; common: string };
    };
}
