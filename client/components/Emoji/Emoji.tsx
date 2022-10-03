import React from "react";

interface Props {
  className?: string;
  label?: string;
  symbol: string;
}
const Emoji: React.FC<Props> = ({ className, label, symbol }: any) => (
  <span className={className} role="img" aria-label={label}>
    {String.fromCodePoint(symbol)}
  </span>
);
export default Emoji;
