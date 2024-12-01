import mongoose, { Schema, Document, Types } from "mongoose";
import { IRoute } from "./routeModel";
import { IUser } from "./userModel";

export interface IBus extends Document {
  licensePlate: string;
  modell: string;
  capacity: number;
  status: {
    service: string;
    outOfService: string;
    maintenance: string;
  };
  driverId: IUser["_id"]
  routeId: IRoute["_id"]
  createAt: Date;
}
const busSchema = new Schema<IBus>(
  {
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    modell: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: Array,
      itens: {
        type: String,
        enum: ["service", "outOfService", "maintenance"],
      },
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    routeId: {
        type: Schema.Types.ObjectId,
        ref: "Route"
    }
  },
  { timestamps: true }
);


export default mongoose.model<IBus>("Bus", busSchema);
