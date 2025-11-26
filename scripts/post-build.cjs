const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const iteration2Dir = path.join(distDir, 'iteration2');

console.log('🔄 Starting build post-processing...');

// Step 1: Create iteration2 directory
if (!fs.existsSync(iteration2Dir)) {
  fs.mkdirSync(iteration2Dir, { recursive: true });
}

// Step 2: Copy all files to iteration2 directory (not move)
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy all files to iteration2 subdirectory
const entries = fs.readdirSync(distDir, { withFileTypes: true });

for (let entry of entries) {
  const srcPath = path.join(distDir, entry.name);
  const destPath = path.join(iteration2Dir, entry.name);
  
  if (entry.name !== 'iteration2') {
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Step 3: Fix paths in iteration2 files for direct deployment
const iteration2IndexPath = path.join(iteration2Dir, 'index.html');
if (fs.existsSync(iteration2IndexPath)) {
  let indexContent = fs.readFileSync(iteration2IndexPath, 'utf8');
  
  // Replace /iteration2/ paths with relative paths for direct deployment
  indexContent = indexContent.replace(/\/iteration2\//g, './');
  
  fs.writeFileSync(iteration2IndexPath, indexContent);
  console.log('   - Fixed asset paths in iteration2/index.html for direct deployment');
}

// Step 4: Fix JavaScript files for direct deployment
const assetsDir = path.join(iteration2Dir, 'assets');
if (fs.existsSync(assetsDir)) {
  const jsFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.js'));
  
  for (const jsFile of jsFiles) {
    const jsPath = path.join(assetsDir, jsFile);
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    
    // Replace /iteration2/ paths with relative paths
    jsContent = jsContent.replace(/\/iteration2\//g, './');
    // Replace /Assets/ paths with relative paths
    jsContent = jsContent.replace(/\/Assets\//g, './Assets/');
    
    fs.writeFileSync(jsPath, jsContent);
  }
  
  console.log('   - Fixed asset paths in JavaScript files for direct deployment');
}

// Create redirect index.html at root
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aswang Chronicles - Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=/iteration2/">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            background: #001915;
            color: #B5BDAD;
            text-align: center;
            padding: 50px;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        .logo {
            max-width: 200px;
            margin-bottom: 30px;
        }
        h1 {
            color: #C9A876;
            margin-bottom: 20px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        p {
            font-size: 1.2em;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .spinner {
            border: 4px solid #B5BDAD;
            border-top: 4px solid #C9A876;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        a {
            color: #C9A876;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Aswang Chronicles</h1>
        <div class="spinner"></div>
        <p>Redirecting you to the latest iteration...</p>
        <p>If you are not redirected automatically, <a href="/iteration2/">click here</a>.</p>
    </div>
    <script>
        // Fallback JavaScript redirect
        setTimeout(function() {
            window.location.href = '/iteration2/';
        }, 1000);
    </script>
</body>
</html>`;

// Write the redirect HTML to root index.html
fs.writeFileSync(path.join(distDir, 'index.html'), redirectHtml);

console.log('✅ Build post-processing complete:');
console.log('   - All application files moved to /iteration2/ subdirectory');
console.log('   - Root redirect page created');
console.log('   - Deployment optimized - no duplicate files');
console.log('   - Ready for deployment with clean subdirectory structure');