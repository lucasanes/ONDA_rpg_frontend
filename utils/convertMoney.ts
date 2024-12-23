export function convertMoney({
  to,
  tc,
  tp,
}: {
  to: number;
  tc: number;
  tp: number;
}) {
  const tcValue = 0.1;
  const tsValue = 1;
  const toValue = 10;

  return to * toValue + tc * tcValue + tp * tsValue;
}
