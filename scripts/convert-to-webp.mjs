import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const imagesDir = './public/images';

try {
  const files = await readdir(imagesDir);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  console.log(`Converting ${pngFiles.length} PNG files to WebP...\n`);

  for (const file of pngFiles) {
    const inputPath = join(imagesDir, file);
    const outputPath = join(imagesDir, file.replace('.png', '.webp'));

    const inputStats = await sharp(inputPath).metadata();

    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const outputStats = await sharp(outputPath).metadata();
    const sizeBefore = inputStats.size || 0;
    const sizeAfter = outputStats.size || 0;
    const savings = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

    console.log(`✓ ${file} → ${file.replace('.png', '.webp')}`);
    console.log(`  ${(sizeBefore / 1024).toFixed(1)}KB → ${(sizeAfter / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
  }

  console.log('✓ All images converted successfully!');
} catch (error) {
  console.error('Error:', error);
  process.exit(1);
}
