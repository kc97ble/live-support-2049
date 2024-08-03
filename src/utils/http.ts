export async function httpGet(
  url: string,
  options: {
    signal?: AbortSignal;
    cache: RequestCache;
    next?: NextFetchRequestConfig; // https://nextjs.org/docs/app/api-reference/functions/fetch
  }
): Promise<unknown> {
  const response = await fetch(url, {
    signal: options.signal,
    cache:
      options.next?.revalidate != null
        ? undefined
        : options.cache || "no-cache",
    next: options.next,
  });
  if (!response.ok) {
    const text = await response.text().catch(() => undefined);
    throw new Error(
      `response not ok (status=${response.status}), url=${url}`, //
      { cause: { status: response.status, text } }
    );
  }
  const data = await response.json();
  return data;
}

export async function httpPost(
  url: string,
  body: unknown,
  options: { signal?: AbortSignal; cache?: RequestCache } = {}
): Promise<unknown> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body, null, 2),
    signal: options.signal,
    cache: options.cache || "no-cache",
  });
  if (!response.ok) {
    const text = await response.text().catch(() => undefined);
    throw new Error(
      `response not ok (status=${response.status}), url=${url}`, //
      { cause: { status: response.status, text } }
    );
  }
  const data = await response.json();
  return data;
}
