import mongoose, { Schema, SchemaTypes } from 'mongoose';

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: SchemaTypes.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: SchemaTypes.String,
    required: true,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  likes: [
    {
      type: SchemaTypes.ObjectId,
    },
  ],
  createdAt: {
    type: SchemaTypes.Date,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
