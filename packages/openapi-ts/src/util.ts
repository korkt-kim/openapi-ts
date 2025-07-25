export function fetchWithTimeout<T = any>(
  input: RequestInfo,
  init?: RequestInit & { timeout: number }
): Promise<T> {
  return Promise.race<any>([
    fetch(input, init),
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error('timeout')), init?.timeout || 5000)
    ),
  ])
}
