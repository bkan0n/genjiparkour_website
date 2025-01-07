<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

function checkModeratorAccess() {
    if (isset($_SESSION['is_moderator']) && $_SESSION['is_moderator'] === true) {
        return true;
    } else {
        header('HTTP/1.1 403 Forbidden');

        echo '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
            <title>Genji Parkour - Access Denied</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body, html {
                    height: 100%;
                    width: 100%;
                    background-color: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #playerContainer {
                    width: 80vw;
                    height: 45vw;
                    max-width: 1280px;
                    max-height: 720px;
                    background: #000;
                    display: none;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #player {
                    width: 100%;
                    height: 100%;
                    max-width: 1280px;
                    max-height: 720px;
                }

                #overlayButton {
                    width: 80vw;
                    height: 45vw;
                    max-width: 1280px;
                    max-height: 720px;
                    background: rgba(0, 0, 0, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: 2em;
                    font-family: Arial, sans-serif;
                    cursor: pointer;
                    text-transform: uppercase;
                    font-weight: bold;
                    position: absolute;
                    z-index: 2;
                }
            </style>
        </head>
        <body>
            <div id="overlayButton" onclick="revealPlayer()">
                Click to access the dashboard
            </div>
            <div id="playerContainer">
                <div id="player"></div>
            </div>

            <script src="https://www.youtube.com/iframe_api"></script>
            <script>
                let player;

                function onYouTubeIframeAPIReady() {
                    player = new YT.Player("player", {
                        videoId: "oHg5SJYRHA0",
                        playerVars: {
                            autoplay: 0,
                            controls: 0,
                            rel: 0,
                            modestbranding: 1,
                            mute: 0,
                            start: 0,
                            playsinline: 1
                        },
                        events: {
                            onReady: onPlayerReady,
                            onStateChange: onPlayerStateChange
                        }
                    });
                }

                function revealPlayer() {
                    document.getElementById("overlayButton").style.display = "none"; 
                    document.getElementById("playerContainer").style.display = "flex"; 
                    player.playVideo(); 
                    player.unMute(); 
                    player.setVolume(100); 
                }

                function onPlayerReady(event) {
                    player.mute(); 
                    event.target.stopVideo(); 
                }

                function onPlayerStateChange(event) {
                    if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
                        player.playVideo(); 
                    }
                }
            </script>
        </body>
        </html>
        ';
        exit;
    }
}
?>
