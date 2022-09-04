import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { Content, StyledArrow } from './styles';

interface ITooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  showArrow?: boolean;

  rootProps?: RadixTooltip.TooltipProps;
  portalProps?: RadixTooltip.TooltipPortalProps;
  arrowProps?: RadixTooltip.TooltipArrowProps &
    React.RefAttributes<SVGSVGElement>;
  contentProps?: RadixTooltip.TooltipContentProps &
    React.RefAttributes<HTMLDivElement>;
  triggerProps?: RadixTooltip.TooltipTriggerProps &
    React.RefAttributes<HTMLButtonElement>;
  providerProps?: Omit<RadixTooltip.TooltipProviderProps, 'children'>;
}

export const Tooltip = ({
  children,
  content,
  showArrow = true,
  rootProps = {
    delayDuration: 200,
  },
  arrowProps = {
    width: 10,
    height: 5,
  },
  portalProps = {},
  contentProps = {
    side: 'top',
    sideOffset: 1,
    align: 'center',
  },
  triggerProps = {},
  providerProps = {},
}: ITooltipProps) => {
  return (
    <RadixTooltip.Provider {...providerProps}>
      <RadixTooltip.Root {...rootProps}>
        <RadixTooltip.Trigger asChild {...triggerProps}>
          {children}
        </RadixTooltip.Trigger>

        <RadixTooltip.Portal {...portalProps}>
          <Content {...contentProps}>
            {content}

            {showArrow && <StyledArrow {...arrowProps} />}
          </Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
