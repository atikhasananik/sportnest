import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Zap(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </Icon>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </Icon>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M7 7h10v10" />
    </Icon>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true" {...props}>
      <path d="m12 2 2.9 6.26 6.6.57-5 4.36 1.5 6.45L12 16.9l-6 2.74 1.5-6.45-5-4.36 6.6-.57L12 2Z" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function Clock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function Calendar(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </Icon>
  );
}

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function CheckCircle(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </Icon>
  );
}

export function AlertTriangle(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </Icon>
  );
}

export function Info(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </Icon>
  );
}

export function Plus(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

export function Search(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Icon>
  );
}

export function Menu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function X(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Icon>
  );
}

export function Users(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  );
}

export function ShieldCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function Trophy(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 4h12v5a6 6 0 0 1-12 0V4Z" />
      <path d="M6 6H4a2 2 0 0 0 0 4h2M18 6h2a2 2 0 0 1 0 4h-2" />
      <path d="M12 15v4M8 22h8M9 19h6" />
    </Icon>
  );
}

const sportPaths: Record<string, ReactNode> = {
  football: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m12 7.5 3.4 2.5-1.3 4h-4.2l-1.3-4L12 7.5Z" />
      <path d="M12 7.5V2.5M8.6 10 3.9 8.5M15.4 10l4.7-1.5M9.9 14l-2.9 4.5M14.1 14l2.9 4.5" />
    </>
  ),
  basketball: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M4.9 4.9c3.9 3.9 3.9 10.3 0 14.2M19.1 4.9c-3.9 3.9-3.9 10.3 0 14.2M2 12h20" />
    </>
  ),
  tennis: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M4.9 4.9c3.9 3.9 3.9 10.3 0 14.2M19.1 4.9c-3.9 3.9-3.9 10.3 0 14.2" />
    </>
  ),
  badminton: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="m13 13 7 7M17 3l4 4M15 5l4 4" />
    </>
  ),
  cricket: (
    <>
      <path d="M14.8 3.2 20.8 9.2 9.2 20.8H3.2v-6L14.8 3.2Z" />
      <path d="m6 18 3 3" />
      <circle cx="6" cy="6" r="2" />
    </>
  ),
  swimming: (
    <>
      <circle cx="17" cy="7" r="2" />
      <path d="M3 15c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M3 20c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="m6 13 3-3 4 1 2 3" />
    </>
  ),
  gym: (
    <>
      <path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" />
    </>
  ),
  volleyball: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2c3 3.5 4.5 7.5 4.5 12M21.5 12c-4-1.5-8.5-1-12 1.5M2.5 12c4 1.5 8.5 1 12-1.5" />
    </>
  ),
};

export function SportIcon({
  name,
  ...props
}: IconProps & { name: string }) {
  return <Icon {...props}>{sportPaths[name] ?? sportPaths.football}</Icon>;
}

export function ChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-4.5-4.5L7 20" />
    </Icon>
  );
}
