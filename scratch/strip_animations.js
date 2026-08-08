const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../app/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace <motion.div> with <div> etc.
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');

  // Remove framer-motion props
  content = content.replace(/\s(initial|animate|exit|whileHover|whileTap|whileInView|viewport|transition|custom|variants|layoutId|layout)=\{([^}]*({[^}]*})*[^}]*)\}/g, '');
  // Sometimes they are string props like layout="position"
  content = content.replace(/\s(layout)="[^"]*"/g, '');
  content = content.replace(/\slayout\s/g, ' ');

  // Remove framer-motion imports if they exist and are no longer used
  // (We'll just leave the imports for now to avoid breaking if AnimatePresence is used,
  // but we should remove AnimatePresence wrappers too)
  content = content.replace(/<AnimatePresence[^>]*>/g, '');
  content = content.replace(/<\/AnimatePresence>/g, '');

  fs.writeFileSync(filePath, content);
}
console.log('Stripped framer-motion tags from components.');
