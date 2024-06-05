import mongoose, { Schema, Document } from 'mongoose';

import Panel, { IPanel } from './Panel';

// Don't delete this!
// We must reference Panel so that it is registered with Mongoose
// eslint-disable-next-line no-console
console.log(Panel);

export interface IComic extends Document {
  title: string;
  category: string;
  description: string;
  publication_date: Date;
  thumbnail_url?: string;
  panels: IPanel[];
}

const ComicSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['diary', 'autobio', 'fantology', 'other works'],
    required: true,
  },
  description: { type: String, required: false },
  publication_date: { type: Date, required: true },
  thumbnail_url: { type: String, required: true },
  panels: [{ type: Schema.Types.ObjectId, ref: 'Panel' }],
});

export default mongoose.models.Comic || mongoose.model<IComic>('Comic', ComicSchema);
