export function slotName<PREFIX extends string, BODY extends string>(prefix: PREFIX, body: BODY): `${PREFIX}-${BODY}` {
  return `${prefix}-${body}`.toLowerCase() as `${PREFIX}-${BODY}`;
}
