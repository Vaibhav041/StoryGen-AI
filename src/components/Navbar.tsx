import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import { Badge } from "./ui/badge";

const Navbar = () => {
  return (
    <header className="mt-5">
      <nav className="flex justify-between">
        <section className="flex items-start gap-2">
          <img src="/storygen-logo.webp" className="h-16 w-40" />
          <Badge variant="beta">Beta</Badge>
        </section>
        <section className="flex gap-7 z-10">
          <Link href="https://github.com/vaibhav041/">
            <GitHubIcon
              className="text-gray-500"
              style={{ fontSize: "30px" }}
            />
          </Link>
          <Link href="https://www.linkedin.com/in/vaibhav-sahni-643807182/">
            <LinkedInIcon
              className="text-gray-500"
              style={{ fontSize: "30px" }}
            />
          </Link>
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
