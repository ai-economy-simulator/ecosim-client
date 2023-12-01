const updateOptions = (options: any) => {
  const update = { ...options };
  // if (localStorage.jwt) {
  //   update.headers = {
  //     ...update.headers,
  //     Authorization: `Bearer ${localStorage.jwt}`,
  //   };
  // }
  return update;
};

const fetcher = (url: string, options: RequestInit) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_FASTAPI_URL}${url}`,
    updateOptions(options),
  );
};

export { fetcher };
