import { Routes } from "./types";

export const APP_URL = "http://localhost:5173";
export const API_URL = "http://localhost:3000/jobs";
export const PAGE_LIMIT = 3;
export const ROUTES: Routes = [
  ["jobs/:jobId", /^\/jobs\/(\d+)$/g],
  ["jobs/:jobId/comments/:commentId", /^\/jobs\/(\d+)\/comments\/(\d+)$/g],
];
