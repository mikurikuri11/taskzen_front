export type Hello = {
    hello: string
};

export const getHello = async (): Promise<Hello> => {
    const res = await fetch('http://localhost:8080/api/v1/hello', {
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
}