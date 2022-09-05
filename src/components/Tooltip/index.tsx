import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { Content, StyledArrow } from './styles';

interface ITooltipProps {
  /**
   * @description
   * Content of the tooltip trigger, is the element that will be responsible for activating the tooltip
   * @example <button type="button">Trigger</button>
   * */
  children: React.ReactNode;

  /**
   * @description
   * Content of the tooltip, what will appear when the tooltip is visible
   * @example <div>Content Tooltip</div>
   * */
  content: React.ReactNode;

  /** @description Show or not the little arrow below the content to reference the trigger */
  showArrow?: boolean;

  /**
   * @description Properties that can be passed to the root component of the tooltip lib
   * @example { delayDuration: 200 }
   * */
  rootProps?: RadixTooltip.TooltipProps;

  /**
   * @description
   * Properties that can be passed to the tooltip lib portal component,
   * responsible for telling where the component will be rendered
   * @example { delayDuration: 200 }
   * */
  portalProps?: RadixTooltip.TooltipPortalProps;

  /**
   * @description
   * Properties that can be passed to the little arrow component
   * that appears just below the contents of the tooltip lib
   *
   * @example {  width: 10, height: 5 }
   * */
  arrowProps?: RadixTooltip.TooltipArrowProps &
    React.RefAttributes<SVGSVGElement>;

  /**
   * @description Properties that can be passed to the component above the content
   * @example { side: 'top', sideOffset: 1, align: 'center' }
   * */
  contentProps?: RadixTooltip.TooltipContentProps &
    React.RefAttributes<HTMLDivElement>;

  /** @description Properties that can be passed to the component above the trigger content */
  triggerProps?: RadixTooltip.TooltipTriggerProps &
    React.RefAttributes<HTMLButtonElement>;

  /** @description Properties that can be passed to the provider component, which encompasses the entire tooltip */
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
