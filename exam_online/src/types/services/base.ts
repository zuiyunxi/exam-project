export interface BaseRes<T=any> {
    code: number;
    msg: string;
    data: T
}