var isRunning = false;
var openSound = new Audio('assets/sounds/open-box.ogg');
var volume = 0.25;
var filterType;
var crate = [];
let generatedRewards = [];
let rewardKeyType = "";
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
        const currentLang = document.documentElement.lang || "en";
        
        const currentLangData = data[currentLang] || {};
        
        const { lootbox = {}, popup = {} } = currentLangData;
        
        translations = { lootbox, popup };

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
        data: { user_id: userId, key_type: rewardKeyType, amount: 3 },
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

$('.generate').click(function() {
    if (!userId) {
        showErrorMessage(t('popup.login_required_msg'));
        return;
    }

    $.ajax({
        url: 'api/lootbox/viewUsersKeys.php',
        type: 'GET',
        data: { user_id: userId },
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                alert("Erreur lors de la récupération des clés.");
                console.error("Erreur de récupération des clés:", response.error);
                return;
            }

            if (response.length > 0) {
                const keyData = response[0];
                const keyType = keyData.key_type;
                keys = keyData.amount;

                if (keys > 0) {
                    getRandomRewards(userId, keyType);
                } else {
                    alert("Pas assez de clés");
                    console.log("Pas assez de clés, loot box non ouverte");
                }
            } else {
                alert("Aucune clé disponible");
                console.log("Aucune clé disponible");
            }
        },
        error: function(xhr, status, error) {
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
            console.log("Ouverture ultérieure : flip et disintegration");
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
            restoreCrate();
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

function fetchKeys(userId) {
    $.ajax({
        url: 'api/lootbox/viewUsersKeys.php',
        type: 'GET',
        data: { user_id: userId },
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                console.error("Erreur de récupération des clés :", response.error);
                $('#key-count').html("<i class='fas fa-key key-icon'></i> Error fetching keys");
            } else if (response.length > 0) {
                keys = response.reduce((sum, key) => sum + key.amount, 0);
                rewardKeyType = response[0].key_type;
                updateKeyDisplay();
                //console.log("User Keys:", response);
            } else {
                $('#key-count').html(`<i class='fas fa-key key-icon'></i> ${t('lootbox.no_keys_available')}`);
            }
        },
        error: function(xhr, status, error) {
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
        let rewardClass = `reward-${reward.name}`;
        const card = $('<li/>').addClass(`card shadow animated bounceInDown crate-${index}`);
        const cardInner = $('<div/>').addClass('card-inner');
        const cardFront = $('<div/>').addClass('card-front');
        const frontText = $('<span/>').addClass('front-text').text(t('lootbox.pick_a_card'));
        cardFront.append(frontText);

        const cardBack = $('<div/>').addClass(`card-back ${reward.rarity} ${rewardClass}`);
        const rewardImage = $('<img/>').addClass('reward-image').attr('src', `images/${reward.name}.jpg`);

        const rewardName = $('<div/>').addClass('reward-name').text(`Name: ${reward.name}`);
        const rewardType = $('<div/>').addClass('reward-type').text(`Type: ${reward.type}`);
        const rewardRarity = $('<div/>').addClass('reward-rarity').text(`Rarity: ${reward.rarity}`);

        cardBack.append(rewardImage, rewardName, rewardType, rewardRarity);
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
                    }
                });
            }, 1000);
        });
    });

    function revealCard(card, reward, grantRewardFlag = true) {
        if (reward.rarity === 'epic') {
            card.find('.card-inner').addClass('swing-animation').one('animationend', function () {
                $(this).removeClass('swing-animation');
                flipCard(card, reward, grantRewardFlag);
            });
        } else if (reward.rarity === 'legendary') {
            card.find('.card-inner').addClass('random-shake');
            setTimeout(() => {
                card.find('.card-inner').removeClass('random-shake');
                flipCard(card, reward, grantRewardFlag);
            }, 1000);
        } else {
            flipCard(card, reward, grantRewardFlag);
        }
    }

    function flipCard(card, reward, grantRewardFlag) {
        card.toggleClass('flip').toggleClass(`flip-${reward.rarity}`);
        playSound(reward.rarity);
        addGifParticles(card.find('.card-back'), reward.rarity);

        if (card.hasClass('flip')) {
            card.find('.front-text').text('Oops');

            if (grantRewardFlag && !rewardGranted) {
                grantReward(userId, reward.name);
                card.addClass('rewarded');
                rewardGranted = true;
            }
        }
    }
}

function grantReward(userId, rewardType) {
    $.ajax({
        url: 'api/lootbox/grantRewardToUser.php',
        type: 'POST',
        data: { 
            user_id: userId,
            key_type: rewardKeyType,
            reward_type: rewardType,
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
    let sound;
    switch (quality) {
        case 'common': sound = sounds.common; break;
        case 'rare': sound = sounds.rare; break;
        case 'epic': sound = sounds.epic; break;
        case 'legendary': sound = sounds.legendary; break;
        default: sound = new Audio('path/to/default-sound.mp3'); break;
    }

    sound.play().catch(error => console.log("Erreur lors de la lecture du son:", error));
}

function showConfirmationMessage(message) {
    const existingPopup = document.querySelector('.confirmation-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const confirmationPopup = document.createElement('div');
    confirmationPopup.className = 'confirmation-popup';
    confirmationPopup.textContent = message;

    document.body.appendChild(confirmationPopup);

    setTimeout(() => {
        confirmationPopup.classList.add('show');
    }, 10);

    setTimeout(() => {
        confirmationPopup.classList.add('fade-out');
        confirmationPopup.addEventListener('transitionend', () => {
            confirmationPopup.remove();
        }, { once: true });
    }, 800);
}

function showErrorMessage(message) {
    const errorPopup = document.createElement('div');
    errorPopup.className = 'error-popup';
    errorPopup.textContent = message;

    document.body.appendChild(errorPopup);

    setTimeout(() => {
        errorPopup.classList.add('show');
    }, 10);

    setTimeout(() => {
        confirmationPopup.classList.add('fade-out');
        confirmationPopup.addEventListener('transitionend', () => {
            confirmationPopup.remove();
        }, { once: true });
    }, 800);
}

// Temporary 
$('#giveKeyButton').click(function () {
    if (!userId) {
        showErrorMessage("Please login first");
        return;
    }

    $.ajax({
        url: 'api/lootbox/grantKeyToUser.php',
        type: 'POST',
        data: { user_id: userId, key_type: 'Classic' },
        dataType: 'json',
        success: function(response) {
            if (response && response.success) {
                alert("Key type 'Classic' added");
                fetchKeys(userId);
            } else if (response && response.error) {
                alert("Erreur lors de l'ajout de la clé : " + response.error);
                console.error("Erreur de l'API :", response.error);
            } else {
                alert("Erreur inattendue lors de l'ajout de la clé.");
                console.warn("Réponse inattendue de l'API :", response);
            }
        },
        error: function(xhr, status, error) {
            alert("Erreur lors de la connexion à l'API pour ajouter la clé.");
            console.error("Erreur AJAX :", error);
        }
    });
});
