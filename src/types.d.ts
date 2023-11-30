import { Application } from "express";

export interface Controller {
  init(app: Application): void;
}