import { IconBaseProps } from 'react-icons/lib';

// TYPES
interface ISpinnerProps extends IconBaseProps {
  /** @description Responsible for animating the component */
  loading?: boolean;
}

// STYLES
import { WrapperSpinner } from './styles';

export function Spinner({ loading, ...rest }: ISpinnerProps) {
  return <WrapperSpinner loading={loading ? 1 : 0} {...rest} />;
}
