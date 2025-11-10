export const postData = async (url: string, body?: any, signal?: AbortSignal) => {
  const signalObj = signal ? { signal } : {};
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}`,
    {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      ...signalObj
    }
  );

  if (!res.ok) {
    const error = await res.json();
    return { status: res.status, message: error ? error.message : res.statusText };
  }

  const { data } = await res.json();
  return { status: res.status, data };
};
