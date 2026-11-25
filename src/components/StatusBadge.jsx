import { Icon } from './Icons.jsx';

export const STATUS = {
  kommer: 'Kommer',
  'kommer-ikke': 'Kommer ikke',
  'vet-ikke': 'Vet ikke ennå',
};

export function StatusBadge({ status }) {
  const text = STATUS[status] || 'Ikke svart';
  return (
    <span className={`status ${status ? `status--${status}` : ''}`}>
      {status === 'kommer' && <Icon name="sjekk" size={14} />}
      {text}
    </span>
  );
}
