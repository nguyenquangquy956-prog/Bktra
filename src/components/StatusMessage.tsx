interface StatusMessageProps {
  message: string;
  tone?: 'info' | 'error';
}

export function StatusMessage({ message, tone = 'info' }: StatusMessageProps) {
  const toneClass = tone === 'error' ? 'text-red-600' : 'text-slate-600';
  return <p className={`py-8 text-center text-sm ${toneClass}`}>{message}</p>;
}