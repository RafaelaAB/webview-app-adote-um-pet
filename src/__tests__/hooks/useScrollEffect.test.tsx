import { renderHook, act } from '@testing-library/react'
import { useScrollEffect } from '@/hooks/useScrollEffect'

describe('useScrollEffect', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
  })

  it('retorna false quando a página não foi rolada', () => {
    const { result } = renderHook(() => useScrollEffect())
    expect(result.current).toBe(false)
  })

  it('retorna true quando rolado além do threshold padrão (10px)', () => {
    const { result } = renderHook(() => useScrollEffect())

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 15 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(true)
  })

  it('retorna false quando rolado abaixo do threshold', () => {
    const { result } = renderHook(() => useScrollEffect(50))

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 30 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(false)
  })

  it('respeita threshold customizado', () => {
    const { result } = renderHook(() => useScrollEffect(100))

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 101 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(true)
  })

  it('volta para false ao rolar de volta para cima', () => {
    const { result } = renderHook(() => useScrollEffect(10))

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 50 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 5 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(false)
  })

  it('remove o event listener ao desmontar', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollEffect())
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('registra o event listener com passive: true', () => {
    const addSpy = jest.spyOn(window, 'addEventListener')
    renderHook(() => useScrollEffect())
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
  })
})
