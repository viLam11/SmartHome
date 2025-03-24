export type roomObject = {
    id: string,
    name: string,
    img: string,
    devices: deviceObject[]
};

export type deviceObject = {
    feedId: number,
    feedKey: string,
    tittle: string,
    name: string,
    status: boolean
};