export function categoryNameToId(name) {
  const nameIdMap = {
    "General knowledge": 9,
    Sports: 21,
    "Video games": 15,
    History: 23,
    Music: 12,
  };
  return nameIdMap[name];
}
