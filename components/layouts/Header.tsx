import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between p-4 bg-green-900">
      <h1 className="font-bold text-lg text-white hover:text-gray-500">
        <Link href="/">LOGO</Link>
      </h1>
      <nav>
        <ul className="flex justify-around space-x-8 font-semibold text-white">
          <li className="hover:text-gray-500">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
