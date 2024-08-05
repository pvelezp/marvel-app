import { AriaRole, useCallback } from 'react'

const useAccessibility = (
  onClick: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void,
  ariaLabel: string,
  role: AriaRole = 'button'
) => {
  return () => {
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick(event)
        }
      },
      [onClick]
    )

    return {
      tabIndex: 0,
      ...(role && { role }),
      'aria-label': ariaLabel,
      onClick,
      onKeyDown: handleKeyDown,
      onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === ' ') {
          event.preventDefault()
        }
      },
      style: {
        cursor: 'pointer',
        outline: 'none',
      },
      onFocus: (event: React.FocusEvent<HTMLElement>) => {
        event.currentTarget.style.outline = '1px solid lightblue'
      },
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        event.currentTarget.style.outline = 'none'
      },
    }
  }
}

export default useAccessibility
