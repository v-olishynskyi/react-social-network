export type CardProps = {
  classes?: string;
  withPaddings?: boolean;
} & Omit<
  Partial<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >,
  'className'
>;
