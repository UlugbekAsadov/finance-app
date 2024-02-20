interface IOptions {
  body?: BodyInit;
  headers?: HeadersInit;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

const updateOptions = (options?: IOptions) => {
  const update = { ...options };
  update.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return update;
};

export default function fetcher(url: string, options?: IOptions) {
  return fetch(`${process.env.REACT_APP_API}${url}`, updateOptions(options));
}
