export function convertMoney({
  to,
  tp,
  ts,
}: {
  to: number;
  tp: number;
  ts: number;
}) {
  const toValue = 100;
  const tpValue = 10;
  const tsValue = 1;

  return to * toValue + tp * tpValue + ts * tsValue;
}
