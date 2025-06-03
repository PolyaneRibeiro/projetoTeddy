import Card from '@/components/Card';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

const mockData = {
    id: 1,
  name: 'João',
  salary: 5000,
  companyValuation: 1000000,
  createdAt: new Date("2025-06-02T18:52:24.693Z"),
  updatedAt: new Date("2025-06-02T22:20:00.465Z")
};

describe('Card component', () => {
  it('should render correctly with data', () => {
    const { getByText } = render(
      <Card data={mockData} onPressMore={() => {}} />
    );

    expect(getByText('João')).toBeTruthy();
    expect(getByText('Salário: R$ 5.000,00')).toBeTruthy(); 
    expect(getByText('Empresa: R$ 1.000.000,00')).toBeTruthy();
  });

  it('should call onPressMore when pressing more button', () => {
    const onPressMoreMock = jest.fn();

    const { getByTestId } = render(
      <Card data={mockData} onPressMore={onPressMoreMock} />
    );

    fireEvent.press(getByTestId('more-button'));
    expect(onPressMoreMock).toHaveBeenCalled();
  });

  it('should call onPressEdit and onPressRemove when those buttons pressed', () => {
    const onPressEditMock = jest.fn();
    const onPressRemoveMock = jest.fn();
    const onPressMoreMock = jest.fn();

    const { getByTestId } = render(
      <Card
        data={mockData}
        onPressMore={onPressMoreMock}
        onPressEdit={onPressEditMock}
        onPressRemove={onPressRemoveMock}
      />
    );

    fireEvent.press(getByTestId('edit-button'));
    fireEvent.press(getByTestId('remove-button'));

    expect(onPressEditMock).toHaveBeenCalled();
    expect(onPressRemoveMock).toHaveBeenCalled();
  });

  it('should render iconContainerMinus when isSelectedScreen is true', () => {
    const { getByTestId, queryByTestId } = render(
      <Card data={mockData} onPressMore={() => {}} isSelectedScreen={true} />
    );

    expect(getByTestId('icon-container-minus')).toBeTruthy();
    expect(queryByTestId('icon-container')).toBeNull();
  });

  it('should render iconContainer when isSelectedScreen is false', () => {
    const { getByTestId, queryByTestId } = render(
      <Card data={mockData} onPressMore={() => {}} isSelectedScreen={false} />
    );

    expect(getByTestId('icon-container')).toBeTruthy();
    expect(queryByTestId('icon-container-minus')).toBeNull();
  });
});
