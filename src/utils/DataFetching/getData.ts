export const getDataAPIMany = async (str: string) => {
  const response = await fetch(str, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "content-type": "application/json",
    },
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getDataAPIOne = async ({
  slug,
  str,
}: {
  slug: string;
  str: string;
}) => {
  const response = await fetch(`${str}/${slug}`);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
