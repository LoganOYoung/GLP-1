interface LastUpdatedProps {
  date: string | Date;
  label?: string;
}

export default function LastUpdated({ date, label = 'Last updated' }: LastUpdatedProps) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <time
      dateTime={dateObj.toISOString()}
      className="text-xs text-gray-500"
      itemProp="dateModified"
    >
      {label}: {formattedDate}
    </time>
  );
}
