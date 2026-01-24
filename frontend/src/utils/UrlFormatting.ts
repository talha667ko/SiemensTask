export const encodeFilter = (field: string, filter: any): string => {
  if (
    filter.filterType === "number" &&
    filter.type &&
    filter.filter !== undefined
  ) {
    return `${field}:${filter.type}:${filter.filter}`;
  }
  if (
    filter.filterType === "text" &&
    filter.type &&
    filter.filter !== undefined
  ) {
    return `${field}:${filter.type}:${filter.filter}`;
  }

  return `${field}:json:${JSON.stringify(filter)}`;
};

export const decodeFilter = (
  encoded: string,
): { field: string; filter: any } | null => {
  const parts = encoded.split(":");
  if (parts.length < 3) return null;

  const field = parts[0];
  const type = parts[1];

  if (type === "json") {
    try {
      return { field, filter: JSON.parse(parts.slice(2).join(":")) };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const value = parts.slice(2).join(":");
  const numValue = Number(value);

  return {
    field,
    filter: {
      filterType: isNaN(numValue) ? "text" : "number",
      type,
      filter: isNaN(numValue) ? value : numValue,
    },
  };
};
