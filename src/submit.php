<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Playtest maps</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    :root {
      --card-bg: #2f3136;
      --card-radius: 10px;       
      --text-color: #dcddde;     
      --text-muted: #aaa;        
      --title-color: #fff;       
      --username-color: #fff;    
      --banner-size: 60px;       
      --avatar-size: 40px;
      --code-bg: #232427;
      --label-color: #7ab0ff;
    }

    body {
      background: #1e1f22; 
      padding: 20px;
      font-family: sans-serif;
      color: var(--text-color);
    }

    .playtest-card {
      background-color: var(--card-bg);
      border-radius: var(--card-radius);
      padding: 16px;
      width: 360px;
      position: relative; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.25);
      margin-bottom: 20px;
    }

    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .avatar {
      width: var(--avatar-size);
      height: var(--avatar-size);
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
    .username {
      font-weight: 600;
      color: var(--username-color);
      line-height: 1.2;
    }
    .nickname {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .banner {
        position: absolute;
        top: 16px;
        right: 16px;
        
        max-width: var(--banner-size);
        max-height: var(--banner-size);
        height: auto;
        width: auto;
        border-radius: var(--card-radius);
        object-fit: cover;

        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

    .card-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--title-color);
    }

    .card-code-block {
      background-color: var(--code-bg);
      border-radius: 6px;
      padding: 10px;
      font-family: Consolas, monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .line {
      margin-bottom: 6px;
    }
    .label {
      color: var(--label-color);
      font-weight: 500;
      margin-right: 4px;
    }
    .value {
      color: #ffffff; 
    }
  </style>
</head>
<body>

  <div class="playtest-card">
    <img 
      src="assets/banners/ayutthaya.png" 
      alt="Banner" 
      class="banner"
    >

    <div class="card-header">
      <img 
        src="assets/profile/arrow.png"
        alt="Avatar" 
        class="avatar"
      >
      <div class="user-info">
        <div class="username">Arrow</div>
        -->
      </div>
    </div>

    <div class="card-title">Calling all Playtesters!</div>

    <div class="card-code-block">
      <div class="line">
        <span class="label">Code:</span>
        <span class="value">Q1AAR</span>
      </div>
      <div class="line">
        <span class="label">Map:</span>
        <span class="value">New Junk City</span>
      </div>
      <div class="line">
        <span class="label">Type:</span>
        <span class="value">Classic</span>
      </div>
      <div class="line">
        <span class="label">Checkpoints:</span>
        <span class="value">100</span>
      </div>
      <div class="line">
        <span class="label">Difficulty:</span>
        <span class="value">Easy</span>
      </div>
      <div class="line">
        <span class="label">Mechanics:</span>
        <span class="value">Edge Climb, Bhop, Bhop First, Quick Climb, Slide, Dash, Ultimate</span>
      </div>
      <div class="line">
        <span class="label">Restrictions:</span>
        <span class="value">Dash Start</span>
      </div>
    </div>
  </div>

</body>
</html>
