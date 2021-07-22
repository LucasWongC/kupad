import React, { useCallback, useEffect, useState } from "react";

import useStakingContract from "hook/staking/useStakingContract";
import useKupadTokenContract from "hook/staking/useKupadTokenContract";
import useUserInfo from "hook/staking/useUserInfo";
import useKupadBalance from "hook/staking/useKupadBalance";
import useSigner from "hook/useSigner";
import { useWeb3React } from "@web3-react/core";
import Logo from "assets/images/logos/favicon.png";
import PinkArrowRight from "assets/images/pink-arrow-right.svg";
import useTotalInvest from "hook/useTotalInvest";
import useIsFinished from "hook/useIsFinished";
import useTotalDeposit from "hook/staking/useTotalDeposit";
import useRewardsPerBlock from "hook/staking/useRewardsPerBlock";
import { toHumanNumber, toBigNumber } from "utils/formatter";
import { BigNumber } from "ethers";
import { presaleTarget, stakingAddress, startTime } from "constants/misc";
import { Button } from "@material-ui/core";
import { userInfo } from "os";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { event } from "jquery";

export default () => {
  const { active, account, deactivate } = useWeb3React();
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const contract = useStakingContract();
  const tokenContract = useKupadTokenContract();
  const { signer } = useSigner();
  const { userInfo } = useUserInfo();
  const { totalDeposit } = useTotalDeposit();
  const { rewardsPerBlock } = useRewardsPerBlock();
  const balance = useKupadBalance();
  const [whitelisted, setWhitelisted] = useState(true);

  const [kupadPrice, setKupadPrice] = useState(0.2);
  const [totalSupply, setTotalSupply] = useState(1500000);
  const [displayType, setDisplayType] = useState(3600 * 24);
  const dismissResultModal = () => {
    setSuccessMsg(undefined);
    setErrorMsg(undefined);
  };
  const MAX_INT =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const useStyles = makeStyles((theme) => ({
    formControl: {
      // margin: theme.spacing(1),
      maxWidth: 120,
    },
    selectEmpty: {
      // marginTop: theme.spacing(2),
      textAlign: "center",
      color: "white",
    },
    whiteColor: {
      color: "white",
    },
  }));
  const classes = useStyles();
  const Stake = async () => {
    if (signer && contract && whitelisted && tokenContract) {
      setLoading(true);

      try {
        const amountBN = toBigNumber(amount);
        const allowance = await tokenContract.allowance(
          account,
          contract.address
        );
        if (allowance.lt(amountBN)) {
          const tx = await tokenContract.approve(contract.address, MAX_INT);
          await tx.wait(1);
        }

        if (amountBN.isZero()) {
          setErrorMsg("Choose correct amount");
        } else {
          try {
            const tx1 = await contract.stake(amountBN);
            await tx1.wait(1);
            setSuccessMsg(`Staked ${amount} KUPAD`);
          } catch (err) {
            console.error(err);
            setErrorMsg("Stake failed");
          }
        }

        // refreshClaimed();
      } catch (err) {
        console.error(err);
        setErrorMsg("Stake failed");
      }
      setLoading(false);
    }
  };
  const setMax = async () => {
    setAmount(parseFloat(toHumanNumber(balance)).toFixed(2));
  };
  const Unstake = async () => {
    if (signer && contract && whitelisted && tokenContract && userInfo.amount) {
      setLoading(true);

      try {
        const amountBN = toBigNumber(
          parseFloat(toHumanNumber(userInfo.amount)) - 0.1
        );
        if (amountBN.isZero()) {
          setErrorMsg("Choose correct amount");
        } else {
          try {
            const tx1 = await contract.withdraw(amountBN);
            await tx1.wait(1);
            setSuccessMsg(`UnStaked ${amount} KUPAD`);
          } catch (err) {
            console.error(err);
            setErrorMsg("UnStaked failed");
          }
        }

        // refreshClaimed();
      } catch (err) {
        console.error(err);
        setErrorMsg("UnStaked failed");
      }
      setLoading(false);
    }
  };

  const Claim = async () => {
    if (signer && contract && whitelisted && tokenContract) {
      setLoading(true);

      try {
        const tx1 = await contract.claim();
        await tx1.wait(1);
        setSuccessMsg(`UnStaked ${amount} KUPAD`);
      } catch (err) {
        console.error(err);
        setErrorMsg("UnStaked failed");
      }
      setLoading(false);
    }
  };

  return (
    <div className="kpd-staking">
      <div className="container">
        <div className="kpd-staking-card padding30 reponsive-direction">
          <div className="info">
            <div className="logo-container">
              <img src={Logo} alt="Kupad Logo" />
            </div>
            <div className="stake-info-container">
              <div className="kpd-staking-title">KUPAD</div>
              <div className="stake-btn-container">
                <ul className="kpd-footer-social">
                  <li>
                    <a href="https://kupadfinance.medium.com/">
                      <i className="fa fa-globe" />
                    </a>
                  </li>
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
                  <li>
                    <a href="https://kupadfinance.medium.com/">
                      <i className="fab fa-reddit" />
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
          </div>
          <div className="stake-info-container">
            <div className="stake-container">
              <div className="kpd-section1-display-title">Start in</div>
              <div className="kpd-section1-display-info">
                Jun 22, 2021 5:00 PM
              </div>
            </div>
            <div className="divider-row" />
            <div className="stake-container">
              <div className="kpd-section1-display-title">End in</div>
              <div className="kpd-section1-display-info">
                Jun 22, 2021 5:00 PM
              </div>
            </div>
            <div className="divider-row" />
            <div className="stake-container">
              <div className="kpd-section1-display-title">
                Distribution time
              </div>
              <div className="kpd-section1-distribution-time">Perpetual</div>
            </div>
            <div className="divider-row" />
            <div className="stake-container">
              <div className="kpd-section1-display-title">TVL</div>
              <div className="kpd-section1-display-info">
                ${" "}
                {account
                  ? parseFloat(toHumanNumber(totalDeposit)).toFixed(2)
                  : "0"}{" "}
              </div>
            </div>
            <Button className="btn-view-kcc">View on KCC</Button>
          </div>
        </div>

        <div className="kpd-staking-card paddingTop30 paddingLeft30 paddingBottom30 reponsive-direction">
          <div className="info">
            <div className="logo-container">
              <img src={Logo} alt="Kupad Logo" />
            </div>
            <div className="stake-info-container leftSpacing10">
              <div className="kpd-staking-title">KUPAD</div>
              <div className="stake-btn-container">
                <div className="stake-btn">Deposit KUPAD</div>
                <div className="stake-btn leftSpacing10">Earn KUPAD</div>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="stake-info-container">
            <div className="kpd-staking-label">Your KUPAD Balance</div>
            <div className="kpd-staking-label">
              {account ? parseFloat(toHumanNumber(balance)).toFixed(2) : "0"}{" "}
              KUPAD
            </div>
            <div className="stake-btn-container">
              <div className="kpd-staking-label">Your KUPAD staked</div>
              <div className="kpd-staking-display-button">
                <Button className="btn-stake" onClick={Unstake}>
                  Unstake
                </Button>
              </div>
            </div>
            <div className="kpd-staking-amount-label">
              {account && userInfo !== undefined
                ? parseFloat(toHumanNumber(userInfo.amount)).toFixed(2)
                : "0"}{" "}
              KUPAD
            </div>
            <div className="staked-usd-label">$ 457.89</div>
            <div className="input-container">
              <Button className="btn-stake" onClick={Stake}>
                Stake
              </Button>
              <Button className="btn-max" onClick={setMax}>
                MAX
              </Button>
              <input
                className="input-amounts"
                value={amount}
                placeholder="0.0"
                type="number"
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
            </div>
            <div className="stake-btn-container">
              <div className="stake-structure-label">
                Stake Structure:&nbsp;&nbsp;
              </div>
              <div className="stake-structure-intro">
                Unlock claim and unstake at any time
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="claim-info-container">
            <div className="kpd-staking-label">Your KUPAD rewards</div>
            <div className="kpd-staking-amount-label topSpacing10">
              {account && userInfo !== undefined
                ? parseFloat(toHumanNumber(userInfo.pendingRewards)).toFixed(2)
                : "0"}{" "}
              KUPAD
            </div>
            <div className="staked-usd-label topSpacing10">$ 457.89</div>
            <div className="topSpacing10" />
            <Button className="btn-stake" onClick={Claim}>
              Claim
            </Button>
          </div>
        </div>
        <div className="kpd-staking-card paddingTop30 paddingLeft30 paddingBottom30 direction-column">
          <div className="reponsive-direction">
            <div className="stake-container reponsive-direction-reverse">
              <div className="kpd-pool-title">Staking Info</div>

              <div className="alignItems">
                <FormControl className={classes.formControl}>
                  <Select
                    className="dropbox-container"
                    defaultValue={3600 * 24}
                    classes={{
                      root: classes.selectEmpty,
                      icon: classes.whiteColor,
                    }}
                    onChange={(e) => setDisplayType(Number(e.target.value))}
                    disableUnderline
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={3600 * 24}>Daily</MenuItem>
                    <MenuItem value={3600 * 24 * 30}>Monthly</MenuItem>
                    <MenuItem value={3600 * 24 * 30 * 12}>Yearly</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="stake-container reponsive-direction-reverse ">
              <div className="kpd-pool-title">Kupad Price</div>
              <div className="kpd-pool-info kpd-stakview">$ {kupadPrice}</div>
            </div>
            <div className="stake-container reponsive-direction-reverse">
              <div className="kpd-pool-title">APY</div>
              <div className="kpd-pool-info kpd-stakview">
                {account
                  ? (
                      (5 * displayType) /
                      3 /
                      parseFloat(toHumanNumber(totalDeposit))
                    ).toFixed(2)
                  : "0"}{" "}
                %
              </div>
            </div>
            <div className="stake-container reponsive-direction-reverse">
              <div className="kpd-pool-title">Kupad staked</div>
              <div className="kpd-stakview reponsive-direction-reverse">
                <div className="kpd-pool-info">
                  {account
                    ? parseFloat(toHumanNumber(totalDeposit)).toFixed(2)
                    : "0"}{" "}
                  KUPAD
                </div>
                <div className="kpd-pool-info">
                  ${" "}
                  {account
                    ? (
                        parseFloat(toHumanNumber(totalDeposit)) * kupadPrice
                      ).toFixed(2)
                    : "0"}
                </div>
              </div>
            </div>
            <div className="stake-container reponsive-direction-reverse">
              <div className="kpd-pool-title">Kupad daily reward</div>
              <div className="kpd-stakview reponsive-direction-reverse">
                <div className="kpd-pool-info">
                  {account
                    ? (
                        parseFloat(toHumanNumber(rewardsPerBlock)) * 6677
                      ).toFixed(2)
                    : "0"}{" "}
                  KUPAD
                </div>
                <div className="kpd-pool-info">
                  ${" "}
                  {account
                    ? (
                        parseFloat(toHumanNumber(rewardsPerBlock)) *
                        6677 *
                        kupadPrice
                      ).toFixed(2)
                    : "0"}
                </div>
              </div>
            </div>
          </div>

          <div className="topSpacing40 paddingRight30">
            <div className="divider-row" />
          </div>

          <div className="liquidity-container topSpacing20">
            <Button className="btn-buy">Buy KUPAD</Button>
            <Button className="btn-liquidity">+ Add Liquidity</Button>
          </div>
        </div>
        <div className="kpd-about-container">
          <div className="kpd-about-title">About project</div>
          <div className="kpd-about-info">
            KUPAD is the first decentralized launchpad on Kucoin Community
            Chain. KUPAD is a protocol built on Kucoin blockchain with the sole
            aim of helping projects raise capital in a decentralized way, an
            easy approach for both investors and project to either invest or
            raise FUNDS.
          </div>
        </div>
      </div>
    </div>
  );
};