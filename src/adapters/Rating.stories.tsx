import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { useState } from 'react';

const meta: Meta<typeof Rating> = {
  title: 'Forms/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    value: 3,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Rating value={value} onChange={setValue} />
        <div style={{ fontSize: '0.875rem' }}>Current rating: {value}</div>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Rating value={1} readOnly />
      <Rating value={2.5} readOnly />
      <Rating value={4} readOnly />
      <Rating value={5} readOnly />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
  },
};

export const HalfStars: Story = {
  render: () => {
    const [value, setValue] = useState(3.5);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Rating value={value} onChange={setValue} precision={0.5} />
        <div style={{ fontSize: '0.875rem' }}>Rating: {value}</div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</div>
        <Rating value={4} size="small" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium</div>
        <Rating value={4} size="medium" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</div>
        <Rating value={4} size="large" />
      </div>
    </div>
  ),
};

export const MaxStars: Story = {
  render: () => {
    const [value, setValue] = useState(7);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Rating value={value} onChange={setValue} max={10} />
        <div style={{ fontSize: '0.875rem' }}>Rating: {value} out of 10</div>
      </div>
    );
  },
};

export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    const labels: { [key: number]: string } = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Rating value={value} onChange={setValue} />
        <div style={{ fontSize: '1rem', fontWeight: 500 }}>
          {labels[value] || 'Not rated'}
        </div>
      </div>
    );
  },
};

export const ProductRating: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    const reviews = 127;
    const avgRating = 4.2;

    return (
      <div style={{ maxWidth: 400, border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Product Title</h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Rating value={avgRating} readOnly precision={0.1} />
          <span style={{ fontSize: '0.875rem', color: '#666' }}>
            {avgRating} ({reviews} reviews)
          </span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
            This is a sample product description. It showcases the product features and benefits.
          </p>
        </div>
        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            Rate this product:
          </div>
          <Rating value={rating} onChange={setRating} size="large" />
        </div>
      </div>
    );
  },
};

export const ReviewsList: Story = {
  render: () => {
    const reviews = [
      { name: 'John Doe', rating: 5, comment: 'Excellent product! Highly recommended.' },
      { name: 'Jane Smith', rating: 4, comment: 'Very good, but could be improved.' },
      { name: 'Bob Johnson', rating: 3, comment: 'It\'s okay, meets expectations.' },
      { name: 'Alice Brown', rating: 5, comment: 'Perfect! Exactly what I needed.' },
    ];

    return (
      <div style={{ maxWidth: 500 }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Customer Reviews</h3>
        {reviews.map((review, index) => (
          <div
            key={index}
            style={{
              padding: '1rem',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} readOnly size="small" />
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    );
  },
};
