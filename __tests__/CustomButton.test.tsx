import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '@/components/CustomButton';

describe('CustomButton', () => {
  it('renders with correct title', () => {
    const { getByText } = render(<CustomButton title="Clique aqui" onPress={() => {}} />);
    expect(getByText('Clique aqui')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CustomButton title="Clique" onPress={onPressMock} />);
    fireEvent.press(getByText('Clique'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton title="Desabilitado" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByText('Desabilitado'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
