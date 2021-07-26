import { useCallback, useEffect, useState } from "react";
import { ConnectWalletModal, ResultModal, Loading } from "components";
import { useWeb3React } from "@web3-react/core";
import useTotalInvest from "hook/useTotalInvest";
import useInvested from "hook/useInvested";
import useCanClaim from "hook/useCanClaim";
import useIsFinished from "hook/useIsFinished";
import usePresaleContract from "hook/usePresaleContract";
import useClaimed from "hook/useClaimed";
import useParticipants from "hook/useParticipants";
import useSigner from "hook/useSigner";
import Logo from "assets/images/logos/kubridge.png";
import KupadLogo from "assets/images/logos/favicon.png";
import { toBigNumber, toHumanNumber } from "utils/formatter";
import {
  hardCap,
  presaleAddress,
  presaleTarget,
  presaleSupply,
  startTime,
} from "constants/misc";
import { BigNumber } from "ethers";
import whitelist from "constants/whitelist";
// import Reddit from "assets/images/reddit.svg";

export default () => {
  const { active, account, deactivate } = useWeb3React();
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const { isFinished, refreshIsFinished } = useIsFinished();
  const { invested, refreshInvested } = useInvested();
  const { claimed, refreshClaimed } = useClaimed();
  const { totalInvest, refreshTotalInvest } = useTotalInvest();
  const contract = usePresaleContract();
  const participants = useParticipants();
  const canClaim = useCanClaim();
  const { signer } = useSigner();
  const [whitelisted, setWhitelisted] = useState(true);

  const [showConnectWalletModal, setShowConnectWalletModal] =
    useState<boolean>(false);

  // useEffect(() => {
  //   setWhitelisted(
  //     !!account &&
  //       !!active &&
  //       whitelist.findIndex(
  //         (item: string) => item.toLowerCase() === account?.toLowerCase()
  //       ) > -1
  //   );
  // }, [account, active]);

  const actionHandler = useCallback(() => {
    setShowConnectWalletModal(true);
  }, []);

  // const bnbBalance = useGetBnbBalance();
  const dismissResultModal = () => {
    setSuccessMsg(undefined);
    setErrorMsg(undefined);
  };

  const setMax = () => {
    const remainingAlloc = hardCap.sub(invested);
    const remainingTarget = presaleTarget.sub(totalInvest);
    if (remainingAlloc.gt(remainingTarget)) {
      setAmount(toHumanNumber(remainingTarget));
    } else {
      setAmount(toHumanNumber(remainingAlloc));
    }
  };

  const invest = async () => {
    if (signer && whitelisted) {
      setLoading(true);
      try {
        const amountBN = toBigNumber(amount);
        if (amountBN.isZero()) {
          setErrorMsg("Choose correct amount");
        } else {
          const tx = await signer.sendTransaction({
            to: presaleAddress,
            value: amountBN,
          });
          await tx.wait(1);
          setSuccessMsg(`You invested ${amount} KCS`);
          refreshInvested();
          refreshTotalInvest();
          refreshIsFinished();
        }
      } catch (err) {
        setErrorMsg("Buy failed");
        console.error(err);
      }
      setLoading(false);
    }
  };

  const claim = async () => {
    if (signer && contract && whitelisted) {
      setLoading(true);
      try {
        const tx = await contract.claim();
        await tx.wait(1);
        setSuccessMsg(
          `Claimed ${toHumanNumber(
            presaleSupply
              .mul(totalInvest)
              .div(presaleTarget)
              .mul(invested)
              .div(totalInvest)
          )} KUPAD`
        );
        refreshClaimed();
      } catch (err) {
        console.error(err);
        setErrorMsg("Claim failed");
      }
      setLoading(false);
    }
  };

  return (
    <div className="kpd-sale-details">
      <div className="container">
        <h3 className="kpd-sale-details-title topSpacing100">
          Kupad Token Sale
        </h3>
        <div className="kpd-sale-details-card">
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
              <img src={KupadLogo} alt="Kupad Logo" />
            </div>
            <div className="meta">
              <p className="title">KUPAD</p>
              <ul className="kpd-footer-social">
                <li>
                  <a href="https://kubridge.finance/">
                    <i className="fa fa-globe" />
                  </a>
                </li>
                <li>
                  <a href="https://t.me/KuBridgeKcc">
                    <i className="fas fa-paper-plane" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/KuBridgeKCC">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/KuBridgeKCC">
                    <i className="fab fa-medium-m" />
                  </a>
                </li>
                {/* <li>
                  <a href="/">
                    <img src={Reddit} alt="Reddit" />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="status">
            <div className="item">
              <span className="desc">Start in</span>
              <span className="value">July 25, 2021 2:00 UTC</span>
            </div>
            <div className="item">
              <span className="desc">Max Allocation</span>
              <span className="value">39.85 / 39.85 KCS</span>
            </div>
            {active && account && (
              <div className="item">
                <span className="desc">Your Investment</span>
                <span className="value">{toHumanNumber(invested)} KCS</span>
              </div>
            )}
            <div className="item">
              <span className="desc">No of participants</span>
              <span className="value">100</span>
            </div>
            <div className="item no-border">
              <span className="desc">Access</span>
              <span className="value">Whitelist</span>
            </div>
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
            {active && account && !whitelisted && <span>Not whitelisted</span>}
            {active && account && whitelisted && (
              <>
                {!isFinished && (
                  <div className="buy-container">
                    <input
                      className="amount-input"
                      value={amount}
                      placeholder="0.0"
                      type="number"
                      onChange={(e) => setAmount(e.currentTarget.value)}
                    />
                    <span>KCS</span>
                    <button className="btn-connect" onClick={setMax}>
                      Max
                    </button>
                    {startTime > Date.now() / 1000 && (
                      <button className="btn-connect">Not started</button>
                    )}
                    {startTime <= Date.now() / 1000 && (
                      <button className="btn-connect" onClick={invest}>
                        Buy
                      </button>
                    )}
                  </div>
                )}
                {isFinished && !claimed && (
                  <div className="buy-container">
                    <span>
                      {toHumanNumber(
                        presaleSupply
                          .mul(totalInvest)
                          .div(presaleTarget)
                          .mul(invested)
                          .div(totalInvest)
                      )}{" "}
                      KUPAD allocated
                    </span>
                    {canClaim && (
                      <button className="btn-connect" onClick={claim}>
                        Claim
                      </button>
                    )}
                  </div>
                )}
                {isFinished && claimed && (
                  <div className="buy-container">
                    <span>
                      {toHumanNumber(
                        presaleSupply
                          .mul(totalInvest)
                          .div(presaleTarget)
                          .mul(invested)
                          .div(totalInvest)
                      )}{" "}
                      KUPAD claimed
                    </span>
                  </div>
                )}
              </>
            )}

            <div className="footer">
              {active && account ? (
                <button className="btn-connect" onClick={deactivate}>
                  Disconnect
                </button>
              ) : (
                <button className="btn-connect" onClick={actionHandler}>
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="kpd-sale-details-token-info">
          <h3 className="title">Token Information</h3>
          <div className="kpd-sale-details-card">
            <div className="item">
              <span className="desc">Token Symbol</span>
              <span className="value">KKPAD</span>
            </div>
            <div className="item">
              <span className="desc">Token Name</span>
              <span className="value">KUPAD Finance</span>
            </div>
            <div className="item">
              <span className="desc">Access Type</span>
              <span className="value">Whitelist</span>
            </div>
            <div className="item">
              <span className="desc">Contract</span>
              <a
                href="https://explorer.kcc.io/en/token/0x85eb19c76a1cd461ecb62b0f97fdf67cbef41c1a"
                target="__blank"
                className="value"
              >
                https://explorer....
              </a>
            </div>
          </div>
        </div>

        <div className="kpd-sale-details-token-info">
          <h3 className="title">About project</h3>
          <span className="desc">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using &apos;Content here,
            content here&apos;, making it look like
          </span>
        </div>
      </div>
      <Loading isOpen={loading} />
      <ConnectWalletModal
        isOpen={showConnectWalletModal}
        onDismiss={() => setShowConnectWalletModal(false)}
      />
      <ResultModal
        isOpen={!!successMsg}
        title="SUCCESS"
        message={successMsg}
        onDismiss={dismissResultModal}
      />
      <ResultModal
        isOpen={!!errorMsg}
        title="ERROR"
        message={errorMsg}
        onDismiss={dismissResultModal}
      />
    </div>
  );
};
