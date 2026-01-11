import { vi } from 'vitest'

// Global mocks
global.fetch = vi.fn()

// Mock console methods to reduce noise in tests
console.log = vi.fn()
console.warn = vi.fn()
console.error = vi.fn()

// AbortController and AbortSignal polyfills for older Node.js versions
if (typeof globalThis.AbortController === 'undefined') {
  // Create a minimal AbortSignal implementation
  class MockAbortSignal extends EventTarget {
    aborted = false
    reason: any = undefined

    constructor() {
      super()
    }

    // Static methods required by TypeScript
    static abort(reason?: any): MockAbortSignal {
      const signal = new MockAbortSignal()
      signal.aborted = true
      signal.reason = reason
      return signal
    }

    static any(signals: MockAbortSignal[]): MockAbortSignal {
      const signal = new MockAbortSignal()
      // Mock implementation - return first aborted signal or new one
      const abortedSignal = signals.find(s => s.aborted)
      if (abortedSignal) {
        signal.aborted = true
        signal.reason = abortedSignal.reason
      }
      return signal
    }

    static timeout(milliseconds: number): MockAbortSignal {
      const signal = new MockAbortSignal()
      setTimeout(() => {
        signal.aborted = true
        signal.reason = new Error('Timeout')
      }, milliseconds)
      return signal
    }
  }

  class MockAbortController {
    signal: MockAbortSignal

    constructor() {
      this.signal = new MockAbortSignal()
    }

    abort(reason?: any) {
      this.signal.aborted = true
      this.signal.reason = reason
      this.signal.dispatchEvent(new Event('abort'))
    }
  }

  // Type assertion to satisfy TypeScript
  globalThis.AbortSignal = MockAbortSignal as any
  globalThis.AbortController = MockAbortController as any
}
global.fetch = vi.fn()

// Mock console methods to reduce noise in tests
console.log = vi.fn()
console.warn = vi.fn()
console.error = vi.fn()

// Setup AbortController for Node.js environment
if (typeof AbortController === 'undefined') {
  global.AbortController = class AbortController {
    signal: AbortSignal

    constructor() {
      this.signal = new AbortSignal()
    }

    abort() {
      // Mock implementation
    }
  }
}
