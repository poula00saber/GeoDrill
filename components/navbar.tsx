'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Globe, ArrowUpRight, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Logo } from '@/components/logo'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t, toggle } = useLanguage()
  const { resolvedTheme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Wait until the client has mounted so the theme icon doesn't
  // mismatch between server and client renders (next-themes returns
  // undefined for resolvedTheme during SSR).
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a href="#home" aria-label="GEODRILL home" onClick={() => setOpen(false)}>
          <Logo onDark={!solid} size="h-9" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {t.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                  solid
                    ? 'text-foreground/70 hover:text-primary'
                    : 'text-white/80 hover:text-white',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-lg transition-colors',
              solid
                ? 'text-foreground/80 hover:bg-muted hover:text-primary'
                : 'text-white/90 hover:bg-white/10',
            )}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          <button
            type="button"
            onClick={toggle}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors',
              solid
                ? 'text-foreground/80 hover:bg-muted hover:text-primary'
                : 'text-white/90 hover:bg-white/10',
            )}
            aria-label="Switch language"
          >
            <Globe className="size-4" />
            {t.langLabel}
          </button>

          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 hover:shadow-md sm:inline-flex"
          >
            {t.cta.quote}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-lg transition-colors lg:hidden',
              solid ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10',
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'overflow-hidden border-t border-border bg-background transition-[max-height] duration-500 ease-out lg:hidden',
          open ? 'max-h-[420px]' : 'max-h-0 border-t-transparent',
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {t.nav.map((item, i) => (
            <li
              key={item.id}
              className={cn(
                'transition-all duration-300',
                open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
              )}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
            >
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted hover:text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground"
            >
              {t.cta.quote}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
