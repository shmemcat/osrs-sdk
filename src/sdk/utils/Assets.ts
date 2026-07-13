export class Assets {
  static assetCount = 0;
  static loadingAssetUrls = [];
  static onProgressFns: ((loaded: number, total: number) => void)[] = [];
  static onLoadFns: (() => void)[] = [];

  static loadedAssets = {};

  /**
   * Base URL for CDN-hosted assets (models, sounds, etc).
   *
   * The production CDN (oldschool-cdn.com) only allows production origins via
   * CORS, so fetching it directly from a local dev server hangs on a CORS
   * rejection. When running on localhost we instead use a relative "/cdn" path
   * that the webpack dev server proxies to the CDN server-side (see the
   * `devServer.proxy` config in InfernoTrainer), which is not subject to the
   * browser's CORS check. In production we hit the CDN directly.
   */
  static getCdnBaseUrl() {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
        return "/cdn";
      }
    }
    return "https://oldschool-cdn.com";
  }

  /**
   * Returns the appropriate URL for an asset and also schedules it for preloading.
   */
  static getAssetUrl(asset: string) {
    const url = `${Assets.getCdnBaseUrl()}/${asset}`;
    if (Assets.loadedAssets[url]) {
      return url;
    }
    Assets.loadingAssetUrls.push(url);
    Assets.assetCount++;
    Promise.resolve().then(async () => {
      console.debug(`Preloading asset: ${url}`);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const bytes = await response.arrayBuffer();
        console.debug(`Preloaded asset: ${url}, ${response.statusText}: ${bytes.byteLength}`);
        Assets.loadedAssets[url] = true;
      } catch (e) {
        // Fail soft: if an asset can't be preloaded we still remove it from the
        // pending list below so the loading screen doesn't hang forever. The
        // error is surfaced for debugging (e.g. CORS or CDN failures).
        console.error(`Failed to preload asset: ${url}`, e);
      } finally {
        Assets.loadingAssetUrls = this.loadingAssetUrls.filter((u) => u !== url);
        Assets.onProgressFns.forEach((onProgressFns) =>
          onProgressFns(this.assetCount - this.loadingAssetUrls.length, this.assetCount),
        );
      }
    });
    return url;
  }

  static onAssetProgress(progressFn: (loaded: number, total: number) => void) {
    Assets.onProgressFns.push(progressFn);
  }

  static onAllAssetsLoaded(loadFn: () => void) {
    Assets.onLoadFns.push(loadFn);
  }

  static checkAssetsLoaded(timer: NodeJS.Timeout) {
    if (Assets.loadingAssetUrls.length === 0) {
      Assets.onLoadFns.forEach((onLoadFunction) => onLoadFunction());
      clearInterval(timer);
    }
  }
}
