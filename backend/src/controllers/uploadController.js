import xlsx from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

export const handleFileUpload = (req, res) => {
  console.log('Received file:', req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const wellId = uuidv4();
    const wellName = req.body.wellName || `Well-${wellId.slice(0, 4)}`;

    const well = {
      id: wellId,
      name: wellName,
      depth: jsonData[jsonData.length - 1].DEPTH,
      status: 'active',
      records: jsonData
    };

    return res.json({
      success: true,
      data: well
    });
  } catch (err) {
    console.error('❌ Error parsing Excel:', err);
    return res.status(500).json({ success: false, message: 'Error parsing Excel' });
  }
};
