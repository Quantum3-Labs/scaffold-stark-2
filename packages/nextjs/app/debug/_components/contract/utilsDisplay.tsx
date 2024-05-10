import { ReactElement } from "react";
import { Uint256, validateChecksumAddress } from "starknet";
import { Address } from "~~/components/scaffold-stark";
import { replacer } from "~~/utils/scaffold-stark/common";
import {
  AbiOutput,
  parseParamWithType,
} from "~~/utils/scaffold-stark/contract";
import { CairoTypes } from "~~/utils/scaffold-stark/types";

type DisplayContent =
  | Uint256
  | string
  | bigint
  | boolean
  | Object
  | DisplayContent[]
  | unknown;

export const displayTxResult = (
  displayContent: DisplayContent | DisplayContent[],
  asText: boolean,
  functionOutputs: readonly AbiOutput[] = [],
): string | ReactElement | number => {
  if (displayContent == null) {
    return "";
  }

  if (functionOutputs != null && functionOutputs.length != 0) {
    const type = functionOutputs[0].type;
    const parsedParam = parseParamWithType(type, displayContent, true);

    if (typeof parsedParam === "bigint") {
      const asNumber = Number(parsedParam);
      if (
        !isNaN(asNumber) &&
        asNumber <= Number.MAX_SAFE_INTEGER &&
        asNumber >= Number.MIN_SAFE_INTEGER
      ) {
        return asNumber;
      } else {
        return "Ξ " + parsedParam / BigInt(10 ** 18);
      }
    }

    if (Array.isArray(parsedParam)) {
      const mostReadable = (v: DisplayContent) =>
        ["number", "boolean"].includes(typeof v) ? v : displayTxResultAsText(v);
      const displayable = JSON.stringify(
        parsedParam.map(mostReadable),
        replacer,
      );

      return asText ? (
        displayable
      ) : (
        <span style={{ overflowWrap: "break-word", width: "100%" }}>
          {displayable.replaceAll(",", ",\n")}
        </span>
      );
    }

    return type.includes(CairoTypes.ContractAddress) &&
      validateChecksumAddress(parsedParam) &&
      !asText ? (
      <Address address={parsedParam as `0x${string}`} />
    ) : (
      parsedParam
    );
  }

  return JSON.stringify(displayContent, replacer, 2);
};

export const displayType = (type: string) =>
  type.includes("::") ? type.split("::").pop() : type;
const displayTxResultAsText = (displayContent: DisplayContent) =>
  displayTxResult(displayContent, true);
