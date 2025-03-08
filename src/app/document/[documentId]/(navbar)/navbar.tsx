import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import { MenuBar } from "./menu-bar";

export const Navbar: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between bg-white">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <Image
              src={"/logo.svg"}
              alt="Document Logo"
              width={36}
              height={36}
            />
          </Link>
          <div className="flex flex-col">
            <DocumentInput />
            <MenuBar />
          </div>
        </div>
      </nav>
    </>
  );
};
