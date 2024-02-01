export interface IUploadFile extends Express.Multer.File {
  uploadedPath?: string;
}
