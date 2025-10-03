import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../db';
import Comic from '../../../db/models/Comic';
import Panel from '../../../db/models/Panel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  await dbConnect();

  const { title, category, description, publication_date, panels } = req.body;

  try {
    // Create and save comic document
    const comic = new Comic({
      title,
      category,
      description,
      publication_date,
      thumbnail_url: panels[0].image_url, // default to using the comic's first panel image URL as the thumbnail
    });
    await comic.save();

    // Create, save, and link panel documents
    interface PanelData {
      image_url: string;
      panel_number: number;
    }

    const panelPromises = panels.map(async (panelData: PanelData) => {
      const panel = new Panel({
        comic_id: comic._id,
        ...panelData,
      });
      await panel.save();
      return panel._id;
    });

    const panelIds = await Promise.all(panelPromises);
    comic.panels.push(...panelIds);

    // Update comic document with panels
    await comic.save();

    return res.status(200).json({ message: 'Comic and Panels successfully saved!' });
  } catch (error) {
    console.error('Error saving comic or panels:', error);
    return res.status(500).json({ error: 'An error occurred while saving the comic or panels' });
  }
}
