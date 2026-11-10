type Props = {
  html: string;
  className?: string;
};

export function MarkdownBody({ html, className = "" }: Props) {
  return (
    <div
      className={`prose ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
