/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** CountryInfo Dto */
export interface CountryInfoDto {
  /** CommonName */
  commonName: string | null
  /** OfficialName */
  officialName: string | null
  /** CountryCode */
  countryCode: string | null
  /** Region */
  region: string | null
  /** Country Borders */
  borders?: CountryInfoDto[] | null
}

/** Country */
export interface CountryV3Dto {
  /** Country Code */
  countryCode: string | null
  /** Country Name */
  name: string | null
}

export enum HolidayTypes {
  Public = 'Public',
  Bank = 'Bank',
  School = 'School',
  Authorities = 'Authorities',
  Optional = 'Optional',
  Observance = 'Observance',
}

/** Long Weekend */
export interface LongWeekendV3Dto {
  /**
   * Start Date
   * @format date
   */
  startDate?: string
  /**
   * End Date
   * @format date
   */
  endDate?: string
  /**
   * Day Count
   * @format int32
   */
  dayCount?: number
  /** Need Bridge Day */
  needBridgeDay?: boolean
  /** Test */
  bridgeDays?: string[] | null
}

/** Public Holiday */
export interface PublicHolidayV3Dto {
  /**
   * The date
   * @format date
   */
  date?: string
  /** Local name */
  localName: string | null
  /** English name */
  name: string | null
  /** ISO 3166-1 alpha-2 */
  countryCode: string | null
  /**
   * Is this public holiday every year on the same date
   * @deprecated
   */
  fixed?: boolean
  /** Is this public holiday in every county (federal state) */
  global?: boolean
  /** ISO-3166-2 - Federal states */
  counties?: string[] | null
  /**
   * The launch year of the public holiday
   * @format int32
   */
  launchYear?: number | null
  /** A list of types the public holiday it is valid */
  types: HolidayTypes[] | null
}

/** Version Info Dto */
export interface VersionInfoDto {
  /** Name */
  name: string | null
  /** Version */
  version: string | null
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Nager.Date API - V3
 * @version v3
 * @termsOfService https://date.nager.at/TermsOfService
 * @contact Nager.Date on GitHub (https://github.com/nager/Nager.Date)
 *
 * Nager.Date is open source software. If you would like to support the project you can award a GitHub star ⭐ or much better <a href='https://github.com/sponsors/nager'>start a sponsorship</a>
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Country
     * @name CountryCountryInfo
     * @summary Get country info for the given country
     * @request GET:/api/v3/CountryInfo/{countryCode}
     */
    countryCountryInfo: (countryCode: string, params: RequestParams = {}) =>
      this.request<CountryInfoDto, any>({
        path: `/api/v3/CountryInfo/${countryCode}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Country
     * @name CountryAvailableCountries
     * @summary Get all available countries
     * @request GET:/api/v3/AvailableCountries
     */
    countryAvailableCountries: (params: RequestParams = {}) =>
      this.request<CountryV3Dto[], any>({
        path: `/api/v3/AvailableCountries`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags LongWeekend
     * @name LongWeekendLongWeekend
     * @summary Get long weekends for a given country
     * @request GET:/api/v3/LongWeekend/{year}/{countryCode}
     */
    longWeekendLongWeekend: (
      year: number,
      countryCode: string,
      query?: {
        /**
         * @format int32
         * @default 1
         */
        availableBridgeDays?: number
        subdivisonCode?: string
      },
      params: RequestParams = {},
    ) =>
      this.request<LongWeekendV3Dto[], any>({
        path: `/api/v3/LongWeekend/${year}/${countryCode}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name PublicHolidayPublicHolidaysV3
     * @summary Get public holidays
     * @request GET:/api/v3/PublicHolidays/{year}/{countryCode}
     */
    publicHolidayPublicHolidaysV3: (
      year: number,
      countryCode: string,
      params: RequestParams = {},
    ) =>
      this.request<PublicHolidayV3Dto[], void>({
        path: `/api/v3/PublicHolidays/${year}/${countryCode}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description The calculation is made on the basis of UTC time to adjust the time please use the offset. This is a special endpoint for `curl` 200 = Today is a public holiday 204 = Today is not a public holiday `STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" https://date.nager.at/Api/v3/IsTodayPublicHoliday/AT)` `if [ $STATUSCODE -ne 200 ]; then # error handling; fi`
     *
     * @tags PublicHoliday
     * @name PublicHolidayIsTodayPublicHoliday
     * @summary Check if today is a public holiday, with optional UTC offset adjustment
     * @request GET:/api/v3/IsTodayPublicHoliday/{countryCode}
     */
    publicHolidayIsTodayPublicHoliday: (
      countryCode: string,
      query?: {
        /** The Subdivison Code */
        countyCode?: string
        /**
         * utc timezone offset
         * @format int32
         * @min -12
         * @max 12
         * @default 0
         */
        offset?: number
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v3/IsTodayPublicHoliday/${countryCode}`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name PublicHolidayNextPublicHolidays
     * @summary Returns the upcoming public holidays for the next 365 days for the given country
     * @request GET:/api/v3/NextPublicHolidays/{countryCode}
     */
    publicHolidayNextPublicHolidays: (countryCode: string, params: RequestParams = {}) =>
      this.request<PublicHolidayV3Dto[], any>({
        path: `/api/v3/NextPublicHolidays/${countryCode}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name PublicHolidayNextPublicHolidaysWorldwide
     * @summary Returns the upcoming public holidays for the next 7 days
     * @request GET:/api/v3/NextPublicHolidaysWorldwide
     */
    publicHolidayNextPublicHolidaysWorldwide: (params: RequestParams = {}) =>
      this.request<PublicHolidayV3Dto[], any>({
        path: `/api/v3/NextPublicHolidaysWorldwide`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Version
     * @name VersionGetVersion
     * @summary Retrieve the current version of the Nager.Date library in use.
     * @request GET:/api/v3/Version
     */
    versionGetVersion: (params: RequestParams = {}) =>
      this.request<VersionInfoDto, any>({
        path: `/api/v3/Version`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
}
