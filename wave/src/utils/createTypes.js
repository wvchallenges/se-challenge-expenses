export default function createTypes(base, types) {
  return types.reduce((aggregator, type) => {
    aggregator[type] = `${ base }/${ type }`;
    return aggregator;
  }, {});
}
