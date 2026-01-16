import React, { useState, useRef, useEffect } from 'react';
import './Slider.css';

export interface SliderProps {
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  marks?: boolean | Array<{ value: number; label?: string }>;
  showValue?: boolean;
  vertical?: boolean;
  range?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value: propValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  marks = false,
  showValue = false,
  vertical = false,
  range = false,
  className = '',
}) => {
  const [value, setValue] = useState<number | number[]>(
    propValue ?? (range ? [min, max / 2] : min)
  );
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  const getPercentage = (val: number): number => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (position: number): number => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = vertical
      ? 1 - (position - rect.top) / rect.height
      : (position - rect.left) / rect.width;

    let newValue = min + percentage * (max - min);
    newValue = Math.round(newValue / step) * step;
    newValue = Math.max(min, Math.min(max, newValue));

    return newValue;
  };

  const handleMouseDown = (e: React.MouseEvent, thumbIndex?: number) => {
    if (disabled) return;

    e.preventDefault();
    setActiveThumb(thumbIndex ?? 0);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newValue = getValueFromPosition(
        vertical ? moveEvent.clientY : moveEvent.clientX
      );

      if (range && Array.isArray(value)) {
        const newValues = [...value];
        const index = thumbIndex ?? 0;
        newValues[index] = newValue;
        
        // Ensure thumbs don't cross
        if (index === 0 && newValue > newValues[1]) {
          newValues[0] = newValues[1];
        } else if (index === 1 && newValue < newValues[0]) {
          newValues[1] = newValues[0];
        }
        
        setValue(newValues);
        onChange?.(newValues);
      } else {
        setValue(newValue);
        onChange?.(newValue);
      }
    };

    const handleMouseUp = () => {
      setActiveThumb(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled || activeThumb !== null) return;

    const newValue = getValueFromPosition(
      vertical ? e.clientY : e.clientX
    );

    if (range && Array.isArray(value)) {
      // Find closest thumb
      const distances = value.map(v => Math.abs(v - newValue));
      const closestIndex = distances[0] <= distances[1] ? 0 : 1;
      
      const newValues = [...value];
      newValues[closestIndex] = newValue;
      
      setValue(newValues);
      onChange?.(newValues);
    } else {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const renderMarks = () => {
    if (!marks) return null;

    const markList = Array.isArray(marks)
      ? marks
      : Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
          value: min + i * step,
          label: undefined,
        }));

    return (
      <div className="slider-marks">
        {markList.map((mark, index) => (
          <div
            key={index}
            className="slider-mark"
            style={{
              [vertical ? 'bottom' : 'left']: `${getPercentage(mark.value)}%`,
            }}
          >
            <div className="slider-mark-dot" />
            {mark.label && <span className="slider-mark-label">{mark.label}</span>}
          </div>
        ))}
      </div>
    );
  };

  const values = Array.isArray(value) ? value : [value];
  const leftPercent = getPercentage(values[0]);
  const rightPercent = range && values[1] !== undefined ? getPercentage(values[1]) : 100;

  return (
    <div className={`slider-wrapper ${vertical ? 'vertical' : ''} ${className}`}>
      {label && <label className="slider-label">{label}</label>}
      <div
        ref={sliderRef}
        className={`slider ${disabled ? 'disabled' : ''} ${vertical ? 'vertical' : ''}`}
        onMouseDown={handleTrackClick}
      >
        <div className="slider-track">
          <div
            className="slider-track-fill"
            style={{
              [vertical ? 'bottom' : 'left']: `${leftPercent}%`,
              [vertical ? 'height' : 'width']: `${rightPercent - leftPercent}%`,
            }}
          />
        </div>

        {values.map((val, index) => (
          <div
            key={index}
            className={`slider-thumb ${activeThumb === index ? 'active' : ''}`}
            style={{
              [vertical ? 'bottom' : 'left']: `${getPercentage(val)}%`,
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            tabIndex={disabled ? -1 : 0}
          >
            {showValue && <div className="slider-thumb-value">{val}</div>}
          </div>
        ))}

        {renderMarks()}
      </div>
    </div>
  );
};
