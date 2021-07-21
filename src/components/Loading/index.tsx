import React from "react";
import styled, { css } from "styled-components";
import { animated, useTransition, useSpring } from "react-spring";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const AnimatedDialogOverlay = animated(DialogOverlay);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const AnimatedDialogContent = animated(DialogContent);
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(
  ({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
    <AnimatedDialogContent {...rest} />
  )
).attrs({
  "aria-label": "dialog",
})`
  overflow-y: ${({ mobile }) => (mobile ? "scroll" : "hidden")};

  &[data-reach-dialog-content] {
    background-color: #fff;
    padding: 0px;
    margin: auto;
    width: 400px;
    overflow-y: ${({ mobile }) => (mobile ? "scroll" : "hidden")};
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? "flex-end" : "center")};

    max-width: 400px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
  }
`;

interface ModalProps {
  isOpen: boolean;
}

export default function Modal({ isOpen }: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 210, friction: 20 },
  }));

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              key={key}
              style={props}
              unstable_lockFocusAcrossFrames={false}
            >
              <CircularProgress style={{ color: "#f30069" }} size={100} />
            </StyledDialogOverlay>
          )
      )}
    </>
  );
}
