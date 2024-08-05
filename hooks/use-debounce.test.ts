import { renderHook, act } from '@testing-library/react-hooks'
import useDebounce from './use-debounce' // Adjust the import path as needed

describe('useDebounce', () => {
  jest.useFakeTimers() // Use fake timers to control the timing in the tests

  test('should debounce the value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 1000 },
    })

    // Verify the initial debounced value
    expect(result.current).toBe('initial')

    // Change the value
    rerender({ value: 'updated', delay: 1000 })

    // Fast-forward until all timers have been executed
    act(() => {
      jest.runAllTimers()
    })

    // Verify the debounced value after the delay
    expect(result.current).toBe('updated')
  })

  test('should respect the delay', () => {
    const delay = 2000
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay },
    })

    // Verify the initial debounced value
    expect(result.current).toBe('initial')

    // Change the value
    rerender({ value: 'updated', delay })

    // Fast-forward a shorter time than the delay
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // Verify the debounced value before the delay has passed
    expect(result.current).toBe('initial')

    // Fast-forward until all timers have been executed
    act(() => {
      jest.runAllTimers()
    })

    // Verify the debounced value after the delay
    expect(result.current).toBe('updated')
  })

  test('should handle different delays', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    // Verify the initial debounced value
    expect(result.current).toBe('initial')

    // Change the value and delay
    rerender({ value: 'updated', delay: 1000 })

    // Fast-forward until all timers have been executed
    act(() => {
      jest.runAllTimers()
    })

    // Verify the debounced value after the delay
    expect(result.current).toBe('updated')
  })

  afterAll(() => {
    jest.useRealTimers() // Restore real timers after the tests
  })
})
