import { config, urlJoin } from "../utils";
import isNetworkError from "../utils/is-network-error";

export interface OffsetPaginateResult<T> {
  docs: T[];
  count: number;
}

export interface CursorPaginateResult<T> {
  docs: T[];
  hasNext: boolean;
  nextCursor?: string;
}

export interface RequestOptions extends RequestInit {
  endpoint?: string | number;
  passthroughErrorCatcher?: boolean;
  disableApiKey?: boolean;
}

export abstract class ServiceBase {
  constructor(protected endpoint?: string) {}

  protected get baseEndpoint() {
    if (this.endpoint) {
      return urlJoin(config.API_URL, this.endpoint);
    } else {
      return config.API_URL;
    }
  }

  /**
   * Trả về kết quả, nếu true thì sẽ gọi lại request, nếu false thì sẽ throw
   */
  private async catchError(e: unknown): Promise<boolean> {
    if (isNetworkError(e)) {
      // messengerSubject.next({
      //   type: 'error',
      //   code: 'err_network',
      // });
      return false;
    }
    // messengerSubject.next({
    //   type: 'error',
    //   code: 'unexpected',
    // });
    return false;
  }

  private getOptions(options?: RequestOptions): RequestOptions {
    const headers = options && options.headers;

    return {
      ...options,
      headers: {
        ...headers,
        "X-Api-Key": config.API_KEY,
      },
    };
  }

  private getAbsoluteRequestUrl(options?: RequestOptions) {
    const opts = this.getOptions(options);
    if (
      opts.endpoint &&
      typeof opts.endpoint === "string" &&
      (opts.endpoint.startsWith("?") ||
        (!opts.endpoint.startsWith("?") && opts.endpoint.includes("?")))
    ) {
      return `${this.baseEndpoint}${opts.endpoint}`;
    }
    if (
      (opts.endpoint &&
        typeof opts.endpoint === "string" &&
        !opts.endpoint.startsWith("?") &&
        opts.endpoint.includes("?")) ||
      options?.disableApiKey
    ) {
      return urlJoin(this.baseEndpoint, opts.endpoint);
    }
    return urlJoin(this.baseEndpoint, opts.endpoint, `?key=${config.API_KEY}`);
  }

  private async request<T>(
    url: string,
    config: RequestInit,
    passthroughErrorCatcher = false
  ): Promise<T> {
    let response: Response;
    try {
      response = await fetch(url, config);
    } catch (e) {
      if (passthroughErrorCatcher) {
        throw e;
      }
      const catched = await this.catchError(e);
      if (catched) {
        return this.request(url, config, passthroughErrorCatcher);
      }
      throw e;
    }

    const resp = await response.text();

    let body;

    try {
      body = JSON.parse(resp);
    } catch {
      console.error(resp);
      throw body;
    }

    if (response.status >= 200 && response.status < 300) {
      return body;
    }

    throw body;
  }

  protected async get<T = unknown>(options?: RequestOptions): Promise<T> {
    const { endpoint, passthroughErrorCatcher, ...opts } = this.getOptions(options);
    return this.request(
      this.getAbsoluteRequestUrl(options),
      {
        ...opts,
        method: "GET",
      },
      passthroughErrorCatcher
    );
  }

  protected async post<T = unknown>(body: unknown, options?: RequestOptions): Promise<T> {
    const { endpoint, passthroughErrorCatcher, ...opts } = this.getOptions(options);
    return this.request(
      this.getAbsoluteRequestUrl(options),
      {
        ...opts,
        body: JSON.stringify(body),
        method: "POST",
      },
      passthroughErrorCatcher
    );
  }

  protected async patch<T = unknown>(body: unknown, options?: RequestOptions): Promise<T> {
    const { endpoint, passthroughErrorCatcher, ...opts } = this.getOptions(options);
    return this.request(
      this.getAbsoluteRequestUrl(options),
      {
        ...opts,
        body: JSON.stringify(body),
        method: "PATCH",
      },
      passthroughErrorCatcher
    );
  }
}
