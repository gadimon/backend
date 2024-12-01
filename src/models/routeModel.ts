import mongoose, { Schema, Document } from "mongoose";

export interface IRoute extends Document {
  lineNumber: number;
  name: string;
  stations: string[];
  schedule: [
    {
      departureTime: string;
      arrivalTime: string;
      station: string;
    }
  ];
  createAt: Date;
  updateAt: Date;
}
const routeSchema = new Schema<IRoute>(
  {
    lineNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    stations: {
      type: [String],
      required: true,
    },
    schedule: [{
      type: Array,
      itens: {
        type: Object,
        departureTime: {
          type: String,
          required: true,
        },
        arrivalTime: {
          type: String,
          required: true,
        },
        station: {
          type: String,
          required: true,
        },
      },
    }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model<IRoute>("Route", routeSchema);
