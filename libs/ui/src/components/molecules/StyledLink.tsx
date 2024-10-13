import Link from 'next/link'
import React, { ReactNode } from 'react'

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
}

const Styled = ({ className, href, children }: LinkProps) => {
  return (
    <Link href={href} className={`underline underline-offset-4 text-lg font-semibold ${className}`}>
      {children}
    </Link>
  )
}

export default Styled
