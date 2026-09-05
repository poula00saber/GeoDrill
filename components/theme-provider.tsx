'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useInsertionEffect,
  useMemo,
  useState,
} from 'react'

type Theme = string

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
  attribute?: 'class' | `data-${string}` | Array<'class' | `data-${string}`>
}

interface UseThemeProps {
  themes: string[]
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  theme?: string
  resolvedTheme?: string
  systemTheme?: 'light' | 'dark'
  forcedTheme?: string
}

const DEFAULT_STORAGE_KEY = 'theme'
const ThemeContext = createContext<UseThemeProps>({
  themes: ['light', 'dark'],
  setTheme: () => {},
})

const getSystemTheme = (): 'light' | 'dark' =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

const resolveTheme = (theme: string | undefined, enableSystem: boolean): string =>
  theme === 'system' && enableSystem ? getSystemTheme() : (theme ?? '')

function applyTheme(theme: string, attribute: ThemeProviderProps['attribute']) {
  const { documentElement: root } = document
  const attrs = attribute
    ? Array.isArray(attribute)
      ? attribute
      : [attribute]
    : ['class']
  for (const attr of attrs) {
    if (attr === 'class') {
      root.classList.remove('light', 'dark')
      if (theme) root.classList.add(theme)
    } else if (attr.startsWith('data-')) {
      if (theme) root.setAttribute(attr, theme)
      else root.removeAttribute(attr)
    }
  }
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  enableSystem = false,
  disableTransitionOnChange = false,
  storageKey = DEFAULT_STORAGE_KEY,
  attribute = 'class',
}: ThemeProviderProps) {
  // Read the persisted preference lazily during the initial render.
  // On the server `window` is undefined, so we fall back to defaultTheme.
  // Doing the read in the useState initializer (instead of a post-mount
  // effect) avoids the "setState during render" warning React emits when
  // useInsertionEffect synchronously updates state in React 19+.
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    try {
      return window.localStorage.getItem(storageKey) || defaultTheme
    } catch {
      return defaultTheme
    }
  })

  // Apply the theme class to <html> before the browser paints. Pure DOM
  // mutation, no React state update — safe inside useInsertionEffect.
  useInsertionEffect(() => {
    const initial =
      theme && theme !== 'system' ? theme : resolveTheme(theme, enableSystem)
    if (initial) applyTheme(initial, attribute)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, enableSystem, attribute])

  const setTheme = useCallback(
    (next: Theme | ((prev: Theme) => Theme)) => {
      setThemeState((prev) => {
        const nextValue =
          typeof next === 'function' ? (next as (p: Theme) => Theme)(prev) : next
        try {
          window.localStorage.setItem(storageKey, nextValue)
        } catch {
          // ignore write failures
        }
        const value = nextValue === 'system' && enableSystem
          ? getSystemTheme()
          : nextValue
        applyTheme(value, attribute)
        return nextValue
      })
    },
    [storageKey, attribute, enableSystem],
  )

  // Reflect OS theme changes while in "system" mode.
  useEffect(() => {
    if (!enableSystem) return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      setThemeState((prev) => {
        if (prev === 'system') applyTheme(getSystemTheme(), attribute)
        return prev
      })
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [enableSystem, attribute])

  // Keep the app in sync when the theme changes in another tab.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue)
        applyTheme(e.newValue, attribute)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [storageKey, attribute])

  const value = useMemo<UseThemeProps>(
    () => ({
      themes: enableSystem ? ['light', 'dark', 'system'] : ['light', 'dark'],
      theme,
      resolvedTheme: resolveTheme(theme, enableSystem) || undefined,
      systemTheme: enableSystem ? getSystemTheme() : undefined,
      setTheme,
    }),
    [theme, enableSystem, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): UseThemeProps {
  return useContext(ThemeContext)
}
