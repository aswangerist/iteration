const fs = require('fs');
const path = require('path');

// Create the iteration1 directory in dist
const distDir = path.join(__dirname, '..', 'dist');
const iteration1Dir = path.join(distDir, 'iteration1');

if (!fs.existsSync(iteration1Dir)) {
  fs.mkdirSync(iteration1Dir);
}

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name !== 'iteration1') { // Skip iteration1 directory to avoid infinite loop
        copyDir(srcPath, destPath);
      }
    } else {
      if (entry.name !== 'index.html' || dest === iteration1Dir) { // Copy index.html only to iteration1 dir
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Copy all files except index.html to iteration1 subdirectory
const entries = fs.readdirSync(distDir, { withFileTypes: true });

for (let entry of entries) {
  const srcPath = path.join(distDir, entry.name);
  const destPath = path.join(iteration1Dir, entry.name);
  
  if (entry.name !== 'iteration1' && entry.name !== 'index.html') {
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy index.html to iteration1 directory
const indexPath = path.join(distDir, 'index.html');
const iteration1IndexPath = path.join(iteration1Dir, 'index.html');
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, iteration1IndexPath);
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
console.log('   - Application files copied to /iteration1/ subdirectory');
console.log('   - Redirect page created at root');
console.log('   - Ready for deployment with subdirectory configuration');