export const post = async (url: string, data: unknown) => {
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!result.ok) {
    throw new Error("fail calling api");
  }
};

export const get = async <T>(url: string): Promise<T> => {
  const result = await fetch(url);

  return result.json();
};
