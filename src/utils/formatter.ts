import { BigNumber, utils } from "ethers";

export const truncate = (text: string = "", [h, t]: number[] = [6, 6]) => {
  const head = text.slice(0, h);
  const tail = text.slice(-1 * t, text.length);
  return text.length > h + t ? [head, tail].join("...") : text;
};

export const toHumanNumber = (bn: BigNumber): string => utils.formatEther(bn);

export const toBigNumber = (num: number | string): BigNumber =>
  utils.parseEther(num === "" ? "0" : num.toString());
