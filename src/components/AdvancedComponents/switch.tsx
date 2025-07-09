'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

function Switch({
  className,
  onCheckedChange,
  checked,
  defaultChecked,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isCancelled, setIsCancelled] = React.useState(false);
  
  // Use internal state only if not controlled
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleMouseDown = () => {
    setIsPressed(true);
    setIsCancelled(false);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setIsCancelled(false);
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      setIsPressed(false);
      setIsCancelled(true);
    }
  };

  const handleCheckedChange = (newChecked: boolean) => {
    if (!isCancelled) {
      // Update internal state if not controlled
      if (checked === undefined) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    }
  };

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-pressed={isPressed}
      checked={checked}
      defaultChecked={defaultChecked}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onCheckedChange={handleCheckedChange}
      className={cn(
        'relative shadow-inner ring ring-black/5 inline-flex shrink-0 items-center rounded-full outline-none cursor-pointer',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0.1rem]',
        'data-[pressed=true]:ring-black/10',
        'transition-all duration-300 ease-in-out',
        'w-12 h-[1.65rem]',
        'data-[state=checked]:bg-accent',
        'data-[state=unchecked]:bg-neutral-500/100',
        'data-[state=checked]:data-[pressed=true]:bg-accent/80',
        'data-[state=unchecked]:data-[pressed=true]:bg-neutral-500/50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        data-pressed={isPressed}
        className={cn(
          'absolute flex items-center justify-center bg-background pointer-events-none left-0 rounded-full',
          'transition-all duration-200 ease-in-out',
          'w-[1.3rem] h-[1.3rem]',
          'data-[pressed=true]:w-[1.7rem]',
          'data-[pressed=true]:h-[1.1rem]',
          'translate-x-[0.2rem]',
          'data-[state=checked]:translate-x-[1.5rem]',
          'data-[state=checked]:data-[pressed=true]:translate-x-[1.1rem]',
          'data-[state=checked]:data-[pressed=true]:left-[-0.15rem]',
          'data-[state=unchecked]:data-[pressed=true]:left-[0.15rem]'
        )}
      >
        <AnimatedIcon isChecked={isChecked} isPressed={isPressed} />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };

const AnimatedIcon = ({
  isChecked,
  isPressed,
}: {
  isChecked: boolean;
  isPressed: boolean;
}) => (
  <svg
    viewBox="0 0 20 20"
    className={cn(
      'inline-flex w-fit items-center justify-center',
      'transition-all duration-100 ease-in-out',
      isPressed
        ? 'fill-neutral-500/50'
        : isChecked
        ? 'fill-accent-foreground'
        : 'fill-neutral-500'
    )}
  >
    <rect
      x="4"
      y="8.5"
      height="3"
      className={cn(
        'origin-center transition-all duration-100 ease-in-out',
        isPressed
          ? 'rotate-0 translate-x-[0.2rem] translate-y-[0.05rem] w-1.5 h-0.5'
          : isChecked
          ? 'rotate-45 w-[6px] -translate-x-[1px] translate-y-1'
          : 'rotate-45 w-[12px] translate-x-0 translate-y-0'
      )}
    />
    <rect
      x="4"
      y="8.5"
      height="3"
      className={cn(
        'origin-center transition-all duration-100 ease-in-out',
        isPressed
          ? 'rotate-0 translate-x-[0.2rem] translate-y-[0.05rem] w-1.5 h-0.5'
          : isChecked
          ? '-rotate-45 w-[11px] translate-x-[1.5px] translate-y-0'
          : '-rotate-45 w-[12px] translate-x-0 translate-y-0'
      )}
    />
  </svg>
);