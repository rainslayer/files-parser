import { Application } from "express";
import { FilesParserController } from "./files-parser";

const controllers = [
  FilesParserController
]

export function initializeControllers(app: Application) {
  controllers.forEach(controller => new controller().init(app));
}