const fs = require('fs');
const path = require('path');
const pdfLib = require('pdf-lib');

const fillPdf = async (sourcePath, destinationPath, fields) => {
  const file = fs.readFileSync(path.resolve(sourcePath));
  const pdfDoc = await pdfLib.PDFDocument.load(file);
  const form = pdfDoc.getForm();

  Object.keys(fields).forEach(key => {form.getTextField(key).setText(fields[key]);});

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(destinationPath, pdfBytes);
}

const inputPath = path.resolve(`${__dirname}/../test/data/input.pdf`);
const outputPath = path.resolve(`${__dirname}/../test/data/output.pdf`);
const fieldValues = {
  FullName: 'John Doe',
  CourseName: 'A Very Important Course',
  CompletionDate: new Date().toLocaleDateString('it-IT')
}

fillPdf(inputPath, outputPath, fieldValues)
  .then(() => console.log(`Output file has been written to ${outputPath}`))
  .catch(error => console.error(`Something went wrong - ${error}`))

