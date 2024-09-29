import { IFile } from "../interfaces";

export const doseFileObjExist = (arr: IFile[], id: string) => {
  return arr.some((file) => file.id === id);
};
