export function formatString(source: string, ...args: (number | string)[]) {
  return source.replace(/{(\d+)}/g, (match, [num]: string[]) => `${args[Number(num)] ?? match}`);
}
