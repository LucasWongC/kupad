import Dci from "assets/images/dci.jpeg";
import Phi from "assets/images/phi.jpeg";
import Swgi from "assets/images/swgi.jpg";
import Sc from "assets/images/sc.jpg";
import Pc from "assets/images/pc.jpeg";

export default () => (
  <div className="kpd-cta">
    <div className="container">
      <h2 className="kpd-cta-title">Our partners</h2>
      <div className="partners">
        <div className="partner-bg">
          <img src={Dci} className="img-fluid" alt="phi" />
        </div>
        <div className="partner-bg">
          <img src={Phi} className="img-fluid" alt="phi" />
        </div>
        <div className="partner-bg">
          <img src={Swgi} className="img-fluid" alt="phi" />
        </div>
        <div className="partner-bg">
          <img src={Sc} className="img-fluid" alt="phi" />
        </div>
        {/* <div className="partner-bg">
          <img src={Pc} className="img-fluid" alt="phi" />
        </div> */}
      </div>
    </div>
  </div>
);
