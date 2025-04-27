export type deviceLogObject = {
    logs: miniLogObject[],
};

export type miniLogObject = {
    date: string, 
    value: string,
    type: string,
    createdAt: string
};