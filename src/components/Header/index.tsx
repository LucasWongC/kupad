import { useCallback, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import $ from "jquery";
import { ConnectWalletModal } from "components";
import Logo from "assets/images/logos/logo-white.svg";

export default () => {
  const { active, account, deactivate } = useWeb3React();

  const [showConnectWalletModal, setShowConnectWalletModal] =
    useState<boolean>(false);

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const navMenu = useRef<HTMLUListElement | undefined>(undefined);

  const actionHandler = useCallback(() => {
    setShowConnectWalletModal(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
    $(".kpd-main-menu .nav-menu").slideToggle();
  };

  return (
    <header className="kpd-header">
      <div className="container">
        <div className="kpd-header-inner">
          <div className="kpd-logo">
            <a href="/">
              <img src={Logo} alt="Kupad Logo" />
            </a>
          </div>

          <nav className="kpd-main-menu">
            <button
              className={`mobile-menu-icon ${menuOpened ? "open" : ""}`}
              aria-label="Main Menu Icon"
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
            <ul className="nav-menu" ref={navMenu as any}>
              <li className="active">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="https://explorer.kcc.io/en/token/0x627f63299d9df3d4e22132932da577bb08ca0988">
                  Contract
                </a>
              </li>
              <li>
                {/* <a href="coming-soon.html">Governance</a> */}
                <a href="/coming-soon">
                  Governance <span className="badge">BETA COMING</span>
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfTcZVGwjUqvtfeD1nJDupEH71ZIN6gt-Xsxpq90CIoYUCTCQ/viewform">
                  Apply IDO
                </a>
              </li>
              {/* <li>
                <a href="coming-soon.html">
                  Launchpad <span className="badge">BETA COMING</span>
                </a>
              </li> */}
              <li>
                <a href="/sale">Launchpad</a>
              </li>
              <li>
                <a href="/staking">Stakepad</a>
              </li>
            </ul>
          </nav>

          {active && account ? (
            <button className="header-btn" onClick={deactivate}>
              Disconnect
            </button>
          ) : (
            <button className="header-btn" onClick={actionHandler}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <ConnectWalletModal
        isOpen={showConnectWalletModal}
        onDismiss={() => setShowConnectWalletModal(false)}
      />
    </header>
  );
};
