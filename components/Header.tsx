import Link from "next/link";


interface HeaderProps {
    theme: string
}
export default function Header({ theme }: HeaderProps) {
  return (
    <nav className={`bg-secondary text-base flex items-center justify-evenly p-4  border-2 border-base theme-${theme}`}>
      <Link href="/dictionary">
        <h2 className="font-semibold text-xl hover:bg-alt rounded-md p-2">Dictionary</h2>
      </Link>
        <p className="font-semibold text-xl rounded-md p-2">← CHOOSE →</p>
      <Link href="/thesaurus">
        <h2 className="font-semibold text-xl hover:bg-alt rounded-md p-2">Thesaurus</h2>
      </Link>
    </nav>
  );
}
