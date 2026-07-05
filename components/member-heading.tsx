export function MemberHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="member-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{children}</header>;
}
