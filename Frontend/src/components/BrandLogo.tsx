import { useMemo, useRef } from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'shine' | 'badge' | 'mask' | 'parallax';
type Size = 'sm' | 'md' | 'lg';

export interface BrandLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  size?: Size;
  srcSvg?: string; // defaults to /ensias-logo.svg
  srcPng?: string; // fallback
}

const sizeMap: Record<Size, string> = {
  sm: 'h-10',
  md: 'h-16',
  lg: 'h-24',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'default',
  size = 'md',
  srcSvg = '/ensias-logo.svg',
  srcPng = '/ensias-logo.png',
  className,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const commonImg = (
    <picture>
      <source srcSet={srcSvg} type="image/svg+xml" />
      <img
        src={srcPng}
        alt="ENSIAS logo"
        className={clsx(sizeMap[size], 'w-auto')}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
        }}
      />
    </picture>
  );

  if (variant === 'shine') {
    return (
      <div className={clsx('logo-shine inline-block', className)} {...rest}>
        {commonImg}
        <span className="shine-overlay" />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={clsx('logo-badge inline-flex items-center justify-center', className)} {...rest}>
        {commonImg}
      </div>
    );
  }

  if (variant === 'mask') {
    // Uses CSS mask to fill the logo with a gradient
    const sizes = useMemo(() => ({
      sm: 'w-20 h-12',
      md: 'w-32 h-16',
      lg: 'w-48 h-24',
    }), []);
    return (
      <div
        className={clsx('logo-mask', sizes[size], className)}
        style={{ ['--logo-url' as any]: `url(${srcSvg})` }}
        {...rest}
      />
    );
  }

  if (variant === 'parallax') {
    const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10; // -5..5
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10; // -5..5
      el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    };
    const onLeave: React.MouseEventHandler<HTMLDivElement> = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    };
    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={clsx('transition-transform duration-200 will-change-transform inline-block', className)}
        {...rest}
      >
        {commonImg}
      </div>
    );
  }

  // default
  return (
    <div className={clsx('inline-block', className)} {...rest}>
      {commonImg}
    </div>
  );
};

export default BrandLogo;
