const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const iteration1Dir = path.join(distDir, 'iteration1');

console.log('🔄 Starting build post-processing...');

// Step 1: Create iteration1 directory
if (!fs.existsSync(iteration1Dir)) {
  fs.mkdirSync(iteration1Dir, { recursive: true });
}

// Step 2: Copy all files to iteration1 directory (not move)
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

// Copy all files to iteration1 subdirectory
const entries = fs.readdirSync(distDir, { withFileTypes: true });

for (let entry of entries) {
  const srcPath = path.join(distDir, entry.name);
  const destPath = path.join(iteration1Dir, entry.name);
  
  if (entry.name !== 'iteration1') {
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Step 3: Fix paths in iteration1 files for direct deployment
const iteration1IndexPath = path.join(iteration1Dir, 'index.html');
if (fs.existsSync(iteration1IndexPath)) {
  let indexContent = fs.readFileSync(iteration1IndexPath, 'utf8');
  
  // Replace /iteration1/ paths with relative paths for direct deployment
  indexContent = indexContent.replace(/\/iteration1\//g, './');
  
  fs.writeFileSync(iteration1IndexPath, indexContent);
  console.log('   - Fixed asset paths in iteration1/index.html for direct deployment');
}

// Step 4: Fix JavaScript files for direct deployment
const assetsDir = path.join(iteration1Dir, 'assets');
if (fs.existsSync(assetsDir)) {
  const jsFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.js'));
  
  for (const jsFile of jsFiles) {
    const jsPath = path.join(assetsDir, jsFile);
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    
    // Replace /iteration1/ paths with relative paths
    jsContent = jsContent.replace(/\/iteration1\//g, './');
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
    <meta http-equiv="refresh" content="0; url=/iteration1/">
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
        <p>If you are not redirected automatically, <a href="/iteration1/">click here</a>.</p>
    </div>
    <script>
        // Fallback JavaScript redirect
        setTimeout(function() {
            window.location.href = '/iteration1/';
        }, 1000);
    </script>
</body>
</html>`;

// Write the redirect HTML to root index.html
fs.writeFileSync(path.join(distDir, 'index.html'), redirectHtml);

console.log('✅ Build post-processing complete:');
console.log('   - All application files moved to /iteration1/ subdirectory');
console.log('   - Root redirect page created');
console.log('   - Deployment optimized - no duplicate files');
console.log('   - Ready for deployment with clean subdirectory structure');