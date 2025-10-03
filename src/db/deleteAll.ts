/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

import Comic from './models/Comic';
import Illustration from './models/Illustration';
import Panel from './models/Panel';

dotenv.config();

const DEFAULT_MONGODB_URI = 'mongodb://localhost/ego_gala_comics';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

const deleteAllRecords = async () => {
  // protection against fat-fingering and deleting all records in
  // a non-local database
  if (MONGODB_URI !== DEFAULT_MONGODB_URI) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question('Are you sure you want to delete all records? (y/n) ');
    if (answer !== 'y') {
      console.log('Aborting...');
      process.exit(0);
    }
  }

  mongoose.connect(MONGODB_URI);

  try {
    await Panel.deleteMany({});
    console.log('All Panel records deleted.');

    await Comic.deleteMany({});
    console.log('All Comic records deleted.');

    await Illustration.deleteMany({});
    console.log('All Illustration records deleted.');
  } catch (error) {
    console.error('Error deleting records:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

console.log('Deleting all collections...');
deleteAllRecords();
