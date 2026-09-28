import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/image', () => {
  const MockImage = (props) => {
    const { src, alt, fill, priority, ...rest } = props;
    return React.createElement('img', {
      src,
      alt,
      'data-fill': fill,
      'data-priority': priority,
      ...rest,
    });
  };
  MockImage.displayName = 'NextImage';
  return MockImage;
});
