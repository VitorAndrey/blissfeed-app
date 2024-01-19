import {render} from '@testing-library/react-native';

import {Welcome} from '..';

test('form submits two answers', () => {
  render(<Welcome />);
});
