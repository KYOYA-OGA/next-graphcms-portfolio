import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="navbar justify-between mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="px-2 mx-2">
          <span className="text-lg font-bold">Awesome Portfolio</span>
        </div>
        <div className="hidden px-2 mx-2 lg:flex">
          <ul className="flex items-stretch">
            <li>
              <Link href="/">
                <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="btn btn-ghost btn-sm rounded-btn">About</a>
              </Link>
            </li>
            <li>
              <Link href="/portfolio">
                <a className="btn btn-ghost btn-sm rounded-btn">Portfolio</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a className="btn btn-ghost btn-sm rounded-btn">Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/gallery">
                <a className="btn btn-ghost btn-sm rounded-btn">Gallery</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:hidden navbar-end">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
