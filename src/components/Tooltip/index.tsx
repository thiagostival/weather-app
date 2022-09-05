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

interface IDefaultProps {
  rootProps: ITooltipProps['rootProps'];
  arrowProps: ITooltipProps['arrowProps'];
  contentProps: ITooltipProps['contentProps'];
}

export const Tooltip = ({
  children,
  content,
  showArrow = true,
  rootProps = {},
  arrowProps = {},
  portalProps = {},
  contentProps = {},
  triggerProps = {},
  providerProps = {},
}: ITooltipProps) => {
  const defaultProps: IDefaultProps = {
    rootProps: {
      delayDuration: 200,
    },
    arrowProps: {
      width: 10,
      height: 5,
    },
    contentProps: {
      side: 'top',
      sideOffset: 1,
      align: 'center',
    },
  };

  return (
    <RadixTooltip.Provider {...providerProps}>
      <RadixTooltip.Root {...defaultProps.rootProps} {...rootProps}>
        <RadixTooltip.Trigger asChild {...triggerProps}>
          {children}
        </RadixTooltip.Trigger>

        <RadixTooltip.Portal {...portalProps}>
          <Content {...defaultProps.contentProps} {...contentProps}>
            {content}

            {showArrow && (
              <StyledArrow {...defaultProps.arrowProps} {...arrowProps} />
            )}
          </Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
