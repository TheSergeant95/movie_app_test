import { render, screen, act } from '@testing-library/react';
import CountdownTimer from '@/components/CountdownTimer';

jest.useFakeTimers();

describe('CountdownTimer', () => {
    it('рендерится корректное время на таймере', () => {
        const onTimeout = jest.fn();
        render(<CountdownTimer targetDate={new Date()} timeLimit={3} onTimeout={onTimeout} />);
        expect(screen.getByText(/0:03/)).toBeInTheDocument();
        act(() => jest.advanceTimersByTime(3000));
        expect(onTimeout).toHaveBeenCalled();
    });

    it('рендерится 0 когда разница во времени спускается ниже 0', () => {
        const startTime = new Date('2025-01-01T12:00:00Z');
        const targetDate = new Date('2025-01-01T11:00:00Z');
        const timeLimit = 3 * 60;
        const { getByText } = render(<CountdownTimer startTime={startTime} targetDate={targetDate} timeLimit={timeLimit} />);
        expect(getByText(/0:00/)).toBeInTheDocument();
    });

    it('триггерит таймаут при отсчете времени до 0', () => {
        const onTimeout = jest.fn();
        render(<CountdownTimer targetDate={new Date()} timeLimit={3} onTimeout={onTimeout} />);
        act(() => jest.advanceTimersByTime(3000));
        expect(onTimeout).toHaveBeenCalled();
    });
});

