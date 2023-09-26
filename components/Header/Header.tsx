import { NAVIGATION_LINKS } from "global/navigation";

import styles from "./Header.module.css";
import HeaderLink from "./HeaderLink";

export function Header() {
  return (
    <header className={styles.root}>
      {/* title or logo here */}

      {/* openable menu on mobile */}
      {/* <details className={styles.details}>
        <summary className={styles.open}>
          <Icon type="menu" />
        </summary>
        <div className={styles.content}>Hello</div>
      </details> */}

      {/* normal navigation on desktop */}
      <nav className={styles.nav}>
        {NAVIGATION_LINKS.map((link) => (
          <HeaderLink key={link.href} {...link} />
        ))}
      </nav>
    </header>
  );
}
