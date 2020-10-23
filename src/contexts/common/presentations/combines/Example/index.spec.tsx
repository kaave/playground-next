import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { Example } from '.';

jest.useFakeTimers();

describe('Components', () => {
  describe('<Example />', () => {
    describe('common', () => {
      it('Test Component とゆー文字列をh1で出力する', () => {
        render(<Example message="Test" />);
        const element = screen.getByText(/Test Component/);
        expect(element instanceof HTMLHeadingElement).toBeTruthy();
      });
    });

    describe('props', () => {
      it('messageに渡した文字列をHTMLButtonElementとして出力する', () => {
        const message = 'aiueあいうえ🙇‍♂️';
        render(<Example message={message} />);
        const element = screen.getByText(message);
        expect(element instanceof HTMLButtonElement).toBeTruthy();
      });

      it('messageに渡した文字列をHTMLButtonElementとして出力し、クリックするとonClickが発火する', () => {
        const message = 'aiueあいうえ🙇‍♂️';
        const handleClick = jest.fn();
        render(<Example message={message} onClick={handleClick} />);
        const element = screen.getByText(message);
        fireEvent.click(element);
        expect(handleClick.mock.calls.length).toBe(1);
      });
    });
  });
});
