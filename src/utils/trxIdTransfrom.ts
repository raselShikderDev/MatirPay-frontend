const formatTrxId = (id: string) => {
  if (!id) return "";
//   const firstPart = id.slice(0, 10);
  const lastPart = id.slice(-14);
  return `TrxID${lastPart}`;
};


export default formatTrxId 