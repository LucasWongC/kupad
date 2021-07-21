import LogoWhite from "assets/images/logos/logo-white.svg";
// import Reddit from "assets/images/reddit.svg";

export default () => (
  <footer className="kpd-footer">
    <div className="container">
      <div className="kpd-footer-inner">
        <div className="kpd-footer-logo">
          <img src={LogoWhite} alt="Footer Logo" />
        </div>

        <ul className="kpd-footer-social">
          <li>
            <a href="https://t.me/KUPADKCS">
              <i className="fas fa-paper-plane" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/kupad_finance">
              <i className="fab fa-twitter" />
            </a>
          </li>
          <li>
            <a href="https://kupadfinance.medium.com/">
              <i className="fab fa-medium-m" />
            </a>
          </li>
          {/* <li>
            <a href="/">
              <img src={Reddit} alt="Reddit" />
            </a>
          </li> */}
        </ul>

        <p>
          Copyright © <a href="/">KUPAD</a>. All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
);
