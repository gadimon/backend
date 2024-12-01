import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: {
    passenger: string;
    drivare: string;
    admin: string;
  };
  createAt: Date;
  updateAt: Date;
  comparePassword(userPassword: string): Promise<boolean>;
}
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "אנא הכנס אימייל תקין"],
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    role: {
      type: Array,
      itens: {
        type: String,
        enum: ["passenger", "drivare", "admin"],
      },
    },
  },
  { 
    timestamps: { 
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    }
  }
);
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.index({ email: 1 });

UserSchema.methods.comparePassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
