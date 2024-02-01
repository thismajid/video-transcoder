import { Request } from "express";
import multer, { FileFilterCallback, Multer } from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";

import { HttpError } from "../utils";
import { IUploadFile } from "../interfaces";

const generateUploadedPath = (filename: string) => {
  return `${filename}-${Date.now()}`;
};

const getUploadDirectoryPath = (filename: string) => {
  return path.join(
    __dirname,
    `../uploads/raw/${generateUploadedPath(filename)}`
  );
};

const ensureUploadDirectoryExists = (filename: string) => {
  const dirPath = getUploadDirectoryPath(filename);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const filename = path.parse(file.originalname).name;
    ensureUploadDirectoryExists(filename);
    cb(null, getUploadDirectoryPath(filename));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, file.originalname);
  },
});

const fileUploader: Multer = multer({
  storage: storage,
  limits: {},
  fileFilter: (req: Request, file: IUploadFile, cb: FileFilterCallback) => {
    const allowedFileTypes = [".mp4"];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedFileTypes.includes(fileExtension)) {
      const filename = path.parse(file.originalname).name;
      file.uploadedPath = generateUploadedPath(filename);
      cb(null, true);
    } else {
      cb(new HttpError("Only .mp4 files are allowed.", 400));
    }
  },
});

export { fileUploader };
