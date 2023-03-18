import React from 'react'
type ButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function Button({ className, ...rest }: ButtonProps) {
  return (
    <div
      className={[
        'cursor-pointer duration-150 hover:scale-[1.03] active:scale-[.95]',
        className,
      ].join(' ')}
      {...rest}
    />
  )
}
