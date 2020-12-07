import path from "../../../../node-to-deno/path.ts";
import { Uma } from "../../../../core/src/mod.ts";
import __dirname from "../../../../node-to-deno/__dirname.ts";
import { Router } from "../../../src/index.ts";

const uma = Uma.instance({
  Router,
  ROOT: path.join(__dirname(import.meta), "../app"),
});
const port = 8053;

export const start = () => new Promise((resolve, reject) => {
  uma.start(port, (e: any) => {
    if (e) return reject();
    resolve();
  });
});

export const stop = () => new Promise((resolve, reject) => {
  uma.server.abort();
  resolve();
  // uma.server.close((e: any) => {
  //   if (e) return reject();
  //   resolve();
  // });
});

export const send = (path: string): any => new Promise((resolve, reject) => {
  fetch(`http://localhost:${port}${path}`).then((response) => {
    return response.text();
  }).then((jsonData) => {
    resolve(jsonData !== "" ? jsonData : "Not Found");
  }).catch((err) => {
    reject(err);
  });
});

export const post = (path: string, data?: any): any => new Promise((resolve, reject) => {
  fetch(`http://localhost:${port}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then((response) => {
    return response.text();
  }).then((jsonData) => {
    resolve(jsonData);
  }).catch((err) => {
    reject(err);
  });
});
