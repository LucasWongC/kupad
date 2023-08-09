import { BigNumber } from "ethers";
import Logo from "assets/images/logos/favicon.png";
import PinkArrowRight from "assets/images/pink-arrow-right.svg";
import useTotalInvest from "hook/useTotalInvest";
import useIsFinished from "hook/useIsFinished";
import { toHumanNumber } from "utils/formatter";

import { presaleTarget, startTime } from "constants/misc";
import KubridgeLogo from "assets/images/logos/kubridge.png";

export default () => {
  const { totalInvest } = useTotalInvest();
  const { isFinished } = useIsFinished();

  return (
    <div className="kpd-sale">
      <div className="container">
        <h3 className="kpd-sale-title">Kupad Token Sale</h3>
        <div className="kpd-sale-card">
          {startTime > Date.now() / 1000 && (
            <span className="up-coming">Up-Coming</span>
          )}
          {startTime <= Date.now() / 1000 && !isFinished && (
            <span className="up-coming">Active</span>
          )}
          {startTime <= Date.now() / 1000 && isFinished && (
            <span className="up-coming">Up-Coming</span>
          )}
          <div className="info">
            <div className="logo-container">
              <img src={KubridgeLogo} alt="Kupad Logo" />
            </div>
            <p className="title">Kubridge Token Sale</p>
            <span className="desc">
              KuBridge is a revolution project unlike any that has been seen in
              the Kucoin Community Chain because it has the potential to
              seamlessly “Merge” KCC with other blockchains and this is
              essential for the growth and development of Blockchain and
              decentralization.
            </span>
          </div>
          <div className="status">
            <span className="raise-title">Raise Amount</span>
            <span className="raise-amount">0.0 / 0.0 KCS</span>
            <div className="total-progress">
              <div
                className="progress"
                style={{
                  width: `${Number(0) / 100}%`,
                }}
              />
            </div>
            <span className="desc">
              Minimum Goal: <span className="value">TBA</span>
            </span>
            <div className="access-info">
              <span className="desc">
                Opening: <span className="value">TBA</span>
              </span>
              <span className="desc">
                Access <span className="value">Whitelist</span>
              </span>
            </div>
          </div>
          <div>
            <a href="/sale/kubridgedetails" className="btn-details">
              Details <img src={PinkArrowRight} alt="" />
            </a>
          </div>
        </div>

        <div className="topSpacing40" />

        <div className="kpd-sale-card">
          {startTime > Date.now() / 1000 && (
            <span className="up-coming">Up-Coming</span>
          )}
          {startTime <= Date.now() / 1000 && !isFinished && (
            <span className="up-coming">Active</span>
          )}
          {startTime <= Date.now() / 1000 && isFinished && (
            <span className="up-coming">Ended</span>
          )}
          <div className="info">
            <div className="logo-container">
              <img src={Logo} alt="Kupad Logo" />
            </div>
            <p className="title">Kupad Token Sale</p>
            <span className="desc">
              KUPAD is a protocol built on Kucoin blockchain with the sole aim
              of helping projects raise capital in a decentralized way, an easy
              approach for both investors and project to either invest or raise
              capital.
            </span>
          </div>
          <div className="status">
            <span className="raise-title">Raise Amount</span>
            <span className="raise-amount">
              {toHumanNumber(totalInvest)}/{toHumanNumber(presaleTarget)} KCS
            </span>
            <div className="total-progress">
              <div
                className="progress"
                style={{
                  width: `${
                    Number(
                      totalInvest
                        .mul(BigNumber.from("10000"))
                        .div(presaleTarget)
                        .toNumber()
                    ) / 100
                  }%`,
                }}
              />
            </div>
            <span className="desc">
              Goal: <span className="value">3985 KCS</span>
            </span>
            <div className="access-info">
              <span className="desc">
                Opening: <span className="value">12/07/2021</span>
              </span>
              <span className="desc">
                Access <span className="value">Whitelist</span>
              </span>
            </div>
          </div>
          <div>
            <a href="/sale/detail" className="btn-details">
              Details <img src={PinkArrowRight} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
