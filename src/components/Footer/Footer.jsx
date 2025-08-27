import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { Link } from "react-router-dom";

export function AppFooter() {
  return (
    <Footer container className="rounded-none">
      <FooterCopyright by="sallam" year={2025} />
      <FooterLinkGroup>
        <FooterLink as={Link} to="/posts">
          about
        </FooterLink>
        <FooterLink as={Link} to="/posts">
          Privacy Policy
        </FooterLink>
        <FooterLink as={Link} to="/posts">
          Licensing
        </FooterLink>
        <FooterLink as={Link} to="/posts">
          Contact
        </FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
