import React from "react";

interface Props {
  className?: string;
  label?: string;
  symbol: number;
  style?: React.CSSProperties;
}
const Emoji: React.FC<Props> = ({ className, label, symbol, style }) => (
  <span className={className} role="img" aria-label={label} style={style}>
    {String.fromCodePoint(symbol)}
  </span>
);
export default Emoji;
