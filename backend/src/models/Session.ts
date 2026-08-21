import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true, unique: true, index: true, select: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true, versionKey: false },
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const Session = mongoose.model("Session", sessionSchema);
