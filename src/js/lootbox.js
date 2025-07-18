var isRunning = false;
var openSound = new Audio('assets/sounds/open-box.ogg');
var volume = 0.25;
var filterType;
var crate = [];
let soundPlaybackAllowed = false;
let generatedRewards = [];
let rewardKeyType = "Classic";
let rewardNonce = "";
let keys = 0;
let packOpened = false;
let translations = {};
const sounds = {
    common: new Audio('assets/sounds/common-sound.ogg'),
    rare: new Audio('assets/sounds/rare-sound.ogg'),
    epic: new Audio('assets/sounds/epic-sound.ogg'),
    legendary: new Audio('assets/sounds/legendary-sound.ogg')
};

Object.values(sounds).forEach(sound => {
    sound.preload = 'auto';
});

var value;
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName)
        })
    }
});

$('.js-volume').click(function() {
    if ($(this).hasClass('is-on')) {
        $(this).text('volume_off').removeClass('is-on').addClass('is-off');
        openSound.muted = true;
    } else {
        $(this).text('volume_up').removeClass('is-off').addClass('is-on');
        openSound.muted = false;
    }
});

async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        
        const currentLangData = data[currentLang] || {};
        
        const { lootbox = {}, popup = {}, map_name = {} } = currentLangData;
        
        translations = { lootbox, popup, map_name };

        //console.log("Traductions chargées :", translations);
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function t(path, params = {}) {
    const parts = path.split('.');
    let result = translations;
    for (const part of parts) {
        result = result?.[part];
        if (!result) break;
    }
    if (!result) {
        return path;
    }
    for (const key in params) {
        result = result.replace(`{${key}}`, params[key]);
    }
    return result;
}

async function initializeApp() {
    await loadTranslations();
}

$(document).ready(() => {
    initializeApp();
});

function getRandomRewards(userId, keyType) {
    $.ajax({
        url: `api/lootbox/getRandomItems.php`,
        type: 'GET',
        data: { user_id: userId, key_type: keyType, amount: 3 },
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                console.error("Erreur lors de la génération des récompenses :", response.error);
                alert("Erreur lors de la génération des récompenses.");
                return;
            }

            if (Array.isArray(response.rewards)) {
                generatedRewards = response.rewards;
                rewardNonce = response.nonce;
                //console.log("Récompenses générées :", generatedRewards);
                //console.log("Nonce :", rewardNonce);

                proceedWithLootBoxOpening();
            } else {
                console.error("Les récompenses ne sont pas dans le format attendu.");
                alert("Erreur lors de la récupération des récompenses.");
            }
        },
        error: function(xhr, status, error) {
            console.error("Erreur AJAX :", error);
            alert("Erreur lors de la récupération des récompenses aléatoires.");
        }
    });
}

$('.generate').click(function () {
    if (!userId) {
        showErrorMessage(t('popup.login_required_msg'));
        return;
    }

    if (!rewardKeyType) {
        return;
    }

    pauseCrate();

    $.ajax({
        url: 'api/lootbox/viewUsersKeys.php',
        type: 'GET',
        data: { user_id: userId },
        dataType: 'json',
        success: function (response) {
            if (response.error) {
                alert("Erreur lors de la récupération des clés.");
                console.error("Erreur de récupération des clés:", response.error);
                return;
            }

            const filteredKeys = response.filter(key => key.key_type === rewardKeyType);

            if (filteredKeys.length > 0) {
                const keyData = filteredKeys[0];
                keys = keyData.amount;

                if (keys > 0) {
                    getRandomRewards(userId, rewardKeyType);
                } else {
                    showErrorMessage(t('lootbox.no_keys_available'));
                    restoreCrate();
                    console.log("Aucune clé disponible");
                }
            } else {
                showErrorMessage(t('lootbox.no_keys_available'));
                restoreCrate();
                console.log("Aucune clé disponible");
            }
        },
        error: function (xhr, status, error) {
            console.error("Erreur AJAX :", error);
            alert("Erreur de connexion à l'API");
        }
    });
});

function proceedWithLootBoxOpening() {
    if (keys <= 0) {
        showErrorMessage("You don't have enough keys top open a lootbox");
        //console.log("Pas assez de clés, loot box non ouverte");
        return;
    }

    if (!isRunning) {
        keys--;
        updateKeyDisplay();
        isRunning = true;

        $('#value').text('0').removeClass();
        pauseCrate();
        crate = [];
        value = 0;
        openSound.volume = volume;
        openSound.play();

        const firstTimeDelays = {
            separation: 1000,
            bounceOutUp: 1600,
            bounceInDown: 2500,
        };

        const subsequentDelays = {
            flip: 1000,
            disintegration: 1000,
            bounceInDown: 500,
        };

        const delays = packOpened ? subsequentDelays : firstTimeDelays;

        if (!packOpened) {
            //console.log("Première ouverture : animation de séparation et bounceOutUp");

            if ($(window).width() <= 480) {
                $('.card1').animate({ left: '-=120px', top: '0px', opacity: 1 }, delays.separation, 'swing');
                $('.card2').animate({ left: '0px', top: '10px', opacity: 1 }, delays.separation, 'swing');
                $('.card3').animate({ left: '+=120px', top: '20px', opacity: 1 }, delays.separation, 'swing');
            } else {
                $('.card1').animate({ left: '-=250px', top: '0px', opacity: 1 }, delays.separation, 'swing');
                $('.card2').animate({ left: '0px', top: '10px', opacity: 1 }, delays.separation, 'swing');
                $('.card3').animate({ left: '+=250px', top: '20px', opacity: 1 }, delays.separation, 'swing');
            }

            setTimeout(function () {
                //console.log("Ajout de bounceOutUp aux cartes après séparation.");
                $('.card1, .card2, .card3').each(function () {
                    $(this).removeClass('flip animated bounceInDown').addClass('animated bounceOutUp');
                });
            }, delays.separation);

            setTimeout(() => {
                //console.log("Suppression et apparition des nouvelles cartes");
                deleteCards();
                displayRewards(generatedRewards);

                $('.card').each(function () {
                    $(this).addClass('animated bounceInDown');
                });
            }, delays.separation + delays.bounceOutUp);
        } else {
            //console.log("Ouverture ultérieure : flip et disintegration");
            $('.card').each(function () {
                const card = $(this);

                if (card.hasClass('flip')) {
                    card.removeClass('bounceInDown');
                    card.removeClass('flip');
                }

                setTimeout(() => {
                    card.css({
                        animation: 'disintegration 1s forwards',
                        opacity: 0,
                    });
                }, delays.flip);
            });

            setTimeout(() => {
                deleteCards();
                displayRewards(generatedRewards);
                $('.card').each(function () {
                    $(this).addClass('animated bounceInDown');
                });
            }, delays.flip + delays.disintegration + delays.bounceInDown);
        }

        setTimeout(() => {
            isRunning = false;
            packOpened = true;
        }, delays.separation + delays.bounceOutUp + delays.bounceInDown);
    }
}

function pauseCrate() {
    $('.generate').attr('disabled', 'disabled').css('cursor', 'not-allowed');
}

function restoreCrate() {
    $('.generate').removeAttr('disabled').css('cursor', 'pointer');
}

function deleteCards() {
    $('#crate li').remove();
    $('#box').remove();
}

function fetchKeys(userId, selectedKeyType = 'Classic') {
    if (!userId) {
        return;
    }

    $.ajax({
        url: 'api/lootbox/viewUsersKeys.php',
        type: 'GET',
        data: { user_id: userId },
        dataType: 'json',
        success: function (response) {
            if (response.error) {
                console.error("Erreur de récupération des clés :", response.error);
                $('#key-count').html("<i class='fas fa-key key-icon'></i> Error fetching keys");
            } else if (Array.isArray(response)) {
                const filteredKeys = response.filter(key => key.key_type === selectedKeyType);
                keys = filteredKeys.reduce((sum, key) => sum + key.amount, 0);
                updateKeyDisplay();
            } else {
                $('#key-count').html(`<i class='fas fa-key key-icon'></i> ${t('lootbox.no_keys_available')}`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Erreur AJAX :", error);
            $('#key-count').html("<i class='fas fa-key key-icon'></i> Error fetching keys");
        }
    });
}

async function updateKeyDisplay() {
    await loadTranslations();
    if (userId) {
        $('#key-count').html(`<i class="fas fa-key key-icon"></i> <span id="key-number">${keys}</span>`);
    } else {
        $('#key-count').html(t('popup.login_required_btn'));
    }
    //console.log(`Clés restantes : ${keys}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const keyTypeButton = document.getElementById('key-type-button');
    const keyDropdown = document.getElementById('key-dropdown');

    if (!keyTypeButton || !keyDropdown) {
        console.error('Éléments nécessaires introuvables');
        return;
    }

    function populateDropdown() {
        const keyTypes = ['Classic', 'Winter'];
        keyDropdown.innerHTML = '';

        keyTypes.forEach(keyType => {
            const item = document.createElement('div');
            item.classList.add('dropdown-item');
            item.textContent = keyType;

            item.addEventListener('click', () => {
                //console.log(`Key Type Selected: ${keyType}`);
                rewardKeyType = keyType;

                keyTypeButton.innerHTML = `${keyType} <span class="arrow"></span>`;
                fetchKeys(userId, keyType);

                keyDropdown.style.display = 'none';
            });

            keyDropdown.appendChild(item);
        });
    }

    keyTypeButton.addEventListener('click', () => {
        if (keyDropdown.style.display === 'none' || keyDropdown.style.display === '') {
            keyDropdown.style.display = 'block';
        } else {
            keyDropdown.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!keyTypeButton.contains(event.target) && !keyDropdown.contains(event.target)) {
            keyDropdown.style.display = 'none';
        }
    });

    populateDropdown();

    keyTypeButton.innerHTML = `${rewardKeyType} <span class="arrow"></span>`;
    fetchKeys(userId, rewardKeyType);
});

$(document).ready(function() {
    if (userId) {
        fetchKeys(userId);
    } else {
        updateKeyDisplay();
    }
});

function displayRewards(rewards) {
    $('#crate').empty();

    let rewardGranted = false;

    rewards.forEach((reward, index) => {
        const card = $('<li/>').addClass(`card shadow animated bounceInDown crate-${index}`);
        const cardInner = $('<div/>').addClass('card-inner');
        const cardFront = $('<div/>').addClass('card-front');
        const frontText = $('<span/>').addClass('front-text').text(t('lootbox.pick_a_card'));
        cardFront.append(frontText);

        const cardBack = $('<div/>').addClass('card-back');

        card.data('rarity', reward.rarity);
        card.data('reward-name', reward.name);
        card.data('reward-type', reward.type);
        card.data('reward-image', reward.url);

        let translatedRewardName = reward.name;
        if (currentLang === "cn" && reward.type.toLowerCase() === "background") {
            const translation = t(`map_name.${reward.name.toLowerCase().replace(/ /g, '_').replace(/[()]/g, '')}`);
            translatedRewardName = translation && !translation.startsWith('map_name.') ? translation : reward.name;
        }

        card.data('reward-name-translated', translatedRewardName);
        card.data('reward-type-translated', t(`lootbox.rewards_types.${reward.type.toLowerCase().replace(/ /g, '_')}`));

        const rewardImageContainer = $('<div/>').addClass('reward-image-container');
        const rewardImage = $('<img/>').addClass('reward-image');
        rewardImageContainer.append(rewardImage);

        const rewardName = $('<div/>').addClass('reward-name');
        const rewardType = $('<div/>').addClass('reward-type');
        const rewardsInfo = $('<div/>').addClass('rewards-info').append(rewardName, rewardType);

        cardBack.append(rewardImageContainer, rewardsInfo);
        cardInner.append(cardFront).append(cardBack);
        card.append(cardInner);
        $('#crate').append(card);

        card.on('click', function () {
            if ($(this).hasClass('flip')) {
                $(this).removeClass('flip').addClass('flip');
                return;
            }

            revealCard($(this), reward);

            setTimeout(() => {
                $('.card').not($(this)).each(function () {
                    if (!$(this).hasClass('flip')) {
                        const otherReward = rewards[$(this).index()];
                        revealCard($(this), otherReward, false);
                        $(this).addClass('dashed-line');
                    }
                });
            }, 1000);
        });
    });

    function revealCard(card, reward, grantRewardFlag = true) {
        const rewardImageContainer = card.find('.reward-image-container');
        const rewardImage = rewardImageContainer.find('.reward-image');
        rewardImage.attr('src', card.data('reward-image'));

        const rewardName = card.find('.reward-name');
        const rewardType = card.find('.reward-type');
        rewardName.text(card.data('reward-name-translated'));
        rewardType.text(card.data('reward-type-translated'));
        const cardBack = card.find('.card-back');
        cardBack.removeClass('common rare epic legendary');
        cardBack.addClass(reward.rarity);

        if (reward.rarity === 'epic') {
            card.find('.card-inner').addClass('swing-animation').one('animationend', function () {
                $(this).removeClass('swing-animation');
                setTimeout(function () {
                    flipCard(card, reward, grantRewardFlag);
                }, 500);
            });
        } else if (reward.rarity === 'legendary') {
            card.find('.card-inner').addClass('random-shake');
            setTimeout(function () {
                card.find('.card-inner').removeClass('random-shake');
                flipCard(card, reward, grantRewardFlag);
            }, 1500);
        } else {
            flipCard(card, reward, grantRewardFlag);
        }
        restoreCrate();
    }


    function flipCard(card, reward, grantRewardFlag) {
        card.toggleClass('flip').toggleClass(`flip-${reward.rarity}`);

        if (card.hasClass('flip')) {
            //card.find('.front-text').text('Oops');

            if (grantRewardFlag && !rewardGranted) {
                playSound(reward.rarity);
                grantReward(userId, reward.type, reward.name);
                card.addClass('rewarded');
                rewardGranted = true;
            }
        }
    }
}

function grantReward(userId, rewardType, rewardName) {
    $.ajax({
        url: 'api/lootbox/grantRewardToUser.php',
        type: 'POST',
        data: { 
            user_id: userId,
            key_type: rewardKeyType,
            reward_type: encodeURIComponent(rewardType),
            reward_name: encodeURIComponent(rewardName),
            nonce: rewardNonce
        },
        dataType: 'json',
        success: function(response) {
            if (response && response.error) {
                console.error("Erreur lors de l'attribution de la récompense :", response.error);
                console.log("Erreur lors de l'attribution de la récompense.");
            } else if (response) {
                //console.log("Récompense attribuée avec succès.");
            } else {
                //console.warn("Récompense attribuée");
            }
        },
        error: function(xhr, status, error) {
            console.error("Erreur AJAX :", error);
            console.log("Erreur lors de la connexion à l'API.");
        }
    });
}

function addParticles(container) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = $('<div/>').addClass('particle');
        particle.css({
            '--random-x': Math.random(),
            '--random-y': Math.random(),
            '--random-rotate': Math.random(),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
        });
        container.append(particle);
    }
}

function addGifParticles(cardBack, rarity) {
    cardBack.find('.particle-container').remove();
    let particleGif = rarity === 'legendary' ? 'images/legendary-particles.gif' : 'images/default-particle.gif';
    const particleContainer = $('<div/>').addClass('particle-container').css('background-image', `url(${particleGif})`);
    cardBack.append(particleContainer);
}

function playSound(quality) {
    if (!soundPlaybackAllowed) {
        return;
    }

    let sound;
    switch (quality) {
        case 'common': sound = sounds.common; break;
        case 'rare': sound = sounds.rare; break;
        case 'epic': sound = sounds.epic; break;
        case 'legendary': sound = sounds.legendary; break;
        default: sound = new Audio('path/to/default-sound.mp3'); break;
    }

    if (sound.readyState >= 2) {
        sound.play().catch(error => console.log("Erreur lors de la lecture du son:", error));
    } else {
        console.warn("Le fichier audio n'est pas prêt :", sound.src);
    }
}

document.addEventListener('click', () => {
    Object.values(sounds).forEach(sound => {
        sound.play().then(() => {
            sound.pause();
            sound.currentTime = 0;
            soundPlaybackAllowed = true;
        }).catch(() => {
            console.log("Audio bloqué par le navigateur. Besoin d'une interaction utilisateur");
        });
    });
}, { once: true });

//Info modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('infoModal');
    const infoButton = document.querySelector('.info-button');
    const closeButton = document.querySelector('.close-button');
    const rewardsContainer = document.getElementById('rewards-container');

    infoButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        rewardsContainer.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            rewardsContainer.style.display = 'none';
        }
    });

    async function loadRewards(filterType) {
        try {
            const response = await fetch('api/lootbox/viewAllRewards.php');
            const text = await response.text();
            //console.log('Raw response:', text);
            const rewards = JSON.parse(text);

            let filteredRewards = rewards;
            if (filterType) {
                if (filterType === 'skin-pose') {
                    filteredRewards = rewards.filter(reward =>
                        reward.type === 'skin' || reward.type === 'pose'
                    );
                } else {
                    filteredRewards = rewards.filter(reward => reward.type === filterType);
                }
            }

            const rarityOrder = ['legendary', 'epic', 'rare', 'common'];
            filteredRewards.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));

            rewardsContainer.innerHTML = '';
            filteredRewards.forEach(reward => {
                const rewardCard = document.createElement('div');
                rewardCard.className = 'reward-card';
                rewardCard.innerHTML = `
                    <img src="${reward.url}" alt="${reward.name}">
                    <div class="name">${reward.name}</div>
                    <div class="rarity rarity-${reward.rarity}">${reward.rarity}</div>
                `;
                rewardsContainer.appendChild(rewardCard);
            });

            rewardsContainer.style.display = 'flex';
        } catch (error) {
            console.error('Error fetching rewards:', error);
            rewardsContainer.innerHTML = '<p>Error loading rewards.</p>';
            rewardsContainer.style.display = 'block';
        }
    }

    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.getAttribute('data-type');
            loadRewards(filterType);
        });
    });
});