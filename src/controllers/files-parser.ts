import { Application } from "express";
import { Request, Response } from "express";
import { Controller } from "../types";
import { filesParserService } from "../services/files-parser";

export class FilesParserController implements Controller {
  init(app: Application) {
    app.get("/files-parser/:siteUrl", this.parseSiteFiles);
  }

  async parseSiteFiles(req: Request, res: Response) {
    const { siteUrl } = req.params;

    return await filesParserService.parseFiles(siteUrl)
      .then((files) => res.status(200).send(files))
      .catch((err) => res.status(400).send(err.message));
  }
}
