import parse from "node-html-parser";

class FilesParserService {
  async parseFiles(siteUrl: string) {
    if (!["http://", "https://"].some((schema) => siteUrl.startsWith(schema))) {
      throw new Error("Target site url must begin with http:// or https://");
    }

    const siteHtml = await fetch(siteUrl)
      .then(async (res) => await res.text())
      .catch(() => {
        throw new Error("Can't access target site");
      });

    const html = parse(siteHtml);
    const scripts = html
      .getElementsByTagName("script")
      .map((script) => script.getAttribute("src"))
      .filter((script) => script);

    const stylesheets = html
      .getElementsByTagName("link")
      .filter((link) => link.getAttribute("rel") === "stylesheet")
      .map((link) => link.getAttribute("href"))
      .filter((link) => link);

    return { scripts, stylesheets };
  }
}

export const filesParserService = new FilesParserService();
