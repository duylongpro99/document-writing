"use client";

import { SearchInput } from "@/app/(home)/SearchInput";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
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

        <SearchInput />
        <div className="flex gap-3 items-center pl-6">
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
          />
          <UserButton />
        </div>
      </nav>
    </>
  );
};
