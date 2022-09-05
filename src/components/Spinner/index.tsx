import { IconBaseProps } from 'react-icons/lib';

// TYPES
interface ISpinnerProps extends IconBaseProps {
  loading?: boolean;
}

// STYLES
import { WrapperSpinner } from './styles';

export function Spinner({ loading, ...rest }: ISpinnerProps) {
  return <WrapperSpinner loading={loading ? 1 : 0} {...rest} />;
}
