import mongoose, { Schema, model, models } from "mongoose";

export interface IReply {
  email: string;
  reply: string;
  createdAt?: Date;
}

const ReplySchema = new Schema<IReply>({
  email: { type: String, required: true },
  reply: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Reply = models.Reply || model<IReply>("Reply", ReplySchema);