import mongoose, { Schema, Document } from 'mongoose';

export interface IEnvConfig {
  PORT: number;
  MONGODB_URI: string;
  [key: string]: any;
}
