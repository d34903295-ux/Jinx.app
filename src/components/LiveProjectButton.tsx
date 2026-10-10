import type { ButtonHTMLAttributes } from 'react'
import { Download } from 'lucide-react'
import { sfx } from '../lib/sound'

interface LiveProjectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  href?: string
  download?: boolean | string
}

export function LiveProjectButton({
  label = 'GET APK',
  href,
  download,
  className = '',
  onClick,
  ...props
}: LiveProjectButtonProps) {
  const handleClick = (e: any) => {
    sfx.playSuccess()
    onClick?.(e)
  }

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-[#D7E2EA] font-mono uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm hover:bg-[#00f5a0]/15 hover:border-[#00f5a0]/50 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-lg ' +
    className

  const content = (
    <>
      <Download className="size-3.5 text-[#00f5a0]" />
      <span>{label}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        download={download}
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
      className={baseClasses}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  )
}

export default LiveProjectButton
