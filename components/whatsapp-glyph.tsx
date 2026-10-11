/** Chat-bubble-with-handset glyph used for WhatsApp actions (stroke style matches Lucide). */
export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path
        d="M9 8.6c0 3.1 2.8 6.4 6.4 6.4l1.1-1.6-2.1-1.1-.9.8c-1.1-.4-2.4-1.7-2.8-2.8l.8-.9L10.4 7.3Z"
        fill="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
