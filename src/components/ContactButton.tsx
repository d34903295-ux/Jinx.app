import type { ButtonHTMLAttributes } from 'react'
import { Download, Sparkles } from 'lucide-react'
import { sfx } from '../lib/sound'

interface ContactButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  href?: string
  download?: boolean | string
}

export function ContactButton({
  label = 'DOWNLOAD APK v1.0',
  href,
  download,
  className = '',
  onClick,
  ...props
}: ContactButtonProps) {
  const handleClick = (e: any) => {
    sfx.playSuccess()
    onClick?.(e)
  }

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2.5 font-bold tracking-wider">
      <Download className="size-4 shrink-0 transition-transform group-hover:translate-y-0.5" />
      <span>{label}</span>
      <span className="size-1.5 rounded-full bg-[#00f5a0] animate-ping ml-1" />
    </span>
  )

  const styleProps = {
    background:
      'linear-gradient(123deg, #090B10 0%, #151A26 25%, #7621B0 60%, #00f5a0 100%)',
    boxShadow:
      '0px 10px 30px rgba(0, 245, 160, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.4), inset 0px -2px 6px rgba(0, 0, 0, 0.6)',
  }

  const baseClasses =
    'group relative inline-flex items-center justify-center rounded-full font-mono uppercase text-white transition-all duration-300 hover:scale-105 active:scale-95 px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4 text-xs sm:text-sm md:text-base select-none cursor-pointer border border-[#00f5a0]/50 shadow-2xl ' +
    className

  if (href) {
    return (
      <a
        href={href}
        download={download}
        style={styleProps}
        className={baseClasses}
        onClick={handleClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      style={styleProps}
      className={baseClasses}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  )
}

export default ContactButton
