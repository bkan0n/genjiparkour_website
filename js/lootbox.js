var allHeroes = [];
var allItems = [];
var refinedItems = [];
var rareItems = [];
var isRunning = false;
var openSound = new Audio('assets/sounds/open-box.ogg');
var volume = 0.25;
var filterType;
var weights = [];
var rareWeights = [];
var randomizedItem = [];
var crate = [];
let generatedRewards = [];
let rewardKeyType = "";
let rewardNonce = "";
let keys = 0;
const sounds = {
    common: new Audio('assets/sounds/common-sound.ogg'),
    rare: new Audio('assets/sounds/common-sound.ogg'),
    epic: new Audio('assets/sounds/epic-sound.mp3'),
    legendary: new Audio('assets/sounds/legendary-sound.mp3')
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

function getRandomRewards(userId, keyType) {
    $.ajax({
        url: `api/getRandomItems.php`,
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
                console.log("Récompenses générées :", generatedRewards);
                console.log("Nonce :", rewardNonce);

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
        alert("Veuillez vous connecter pour ouvrir un pack.");
        return;
    }

    $.ajax({
        url: 'api/viewUsersKeys.php',
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
            alert("Erreur de connexion à l'API.");
        }
    });
});

function proceedWithLootBoxOpening() {
    if (keys <= 0) {
        alert("Vous n'avez plus de clés pour ouvrir une loot box.");
        console.log("Pas assez de clés, loot box non ouverte");
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

        $('.crate-0, .crate-1, .crate-2').each(function() {
            if ($(this).hasClass('flip')) {
                $(this).removeClass('flip');
            }
            $(this).addClass('animated bounceOutUp');
        });

        $('.card1').animate({ left: '-=250px', top: '0px', opacity: 1 }, 500, 'swing');
        $('.card2').animate({ left: '0px', top: '10px', opacity: 1 }, 500, 'swing');
        $('.card3').animate({ left: '+=250px', top: '20px', opacity: 1 }, 500, 'swing');

        setTimeout(function() {
            $('.card1, .card2, .card3').each(function() {
                $(this).addClass('animated bounceOutUp');
            });
        }, 600);

        setTimeout(deleteCards, 1500);

        setTimeout(function() {
            displayRewards(generatedRewards);
            generatedRewards = [];
        }, 2350);

        setTimeout(function() {
            restoreCrate();
            isRunning = false;
        }, 4000);
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
        url: 'api/viewUsersKeys.php',
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
                console.log("User Keys:", response);
            } else {
                $('#key-count').html("<i class='fas fa-key key-icon'></i> No keys available");
            }
        },
        error: function(xhr, status, error) {
            console.error("Erreur AJAX :", error);
            $('#key-count').html("<i class='fas fa-key key-icon'></i> Error fetching keys");
        }
    });
}

function updateKeyDisplay() {
    if (userId) {
        $('#key-count').html(`<i class="fas fa-key key-icon"></i> <span id="key-number">${keys}</span>`);
    } else {
        $('#key-count').html("Login required");
    }
    console.log(`Clés restantes : ${keys}`);
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

    rewards.forEach((reward, index) => {
        let rewardClass = `reward-${reward.name}`;
        const card = $('<li/>').addClass(`card shadow animated bounceInDown crate-${index}`);
        const cardInner = $('<div/>').addClass('card-inner');
        const cardFront = $('<div/>').addClass('card-front');
        const frontText = $('<span/>').addClass('front-text').text('Click to reveal');
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
            if (reward.rarity === 'epic') {
                $(this).find('.card-inner').addClass('swing-animation').one('animationend', function() {
                    $(this).removeClass('swing-animation');
        
                    setTimeout(() => {
                        card.toggleClass('flip').toggleClass(`flip-${reward.rarity}`);
                        playSound(reward.rarity);
                        
                        if (card.hasClass('flip')) {
                            addGifParticles(card.find('.card-back'), reward.rarity);
                            $('.card').not('.flip').find('.front-text').text('Click to see what you missed');
                            if (!$('.card').hasClass('rewarded')) {
                                grantReward(userId, reward.name);
                                card.addClass('rewarded');
                            }
                        }
                    }, 200);
                });
            } else if (reward.rarity === 'legendary') {
                $(this).find('.card-inner').addClass('random-shake');

                setTimeout(() => {
                    $(this).find('.card-inner').removeClass('random-shake');
                    
                    setTimeout(() => {
                        card.toggleClass('flip').toggleClass(`flip-${reward.rarity}`);
                        playSound(reward.rarity);
                        
                        if (card.hasClass('flip')) {
                            addGifParticles(card.find('.card-back'), reward.rarity);
                            $('.card').not('.flip').find('.front-text').text('Click to see what you missed');
                            if (!$('.card').hasClass('rewarded')) {
                                grantReward(userId, reward.name);
                                card.addClass('rewarded');
                            }
                        }
                    }, 50);
                }, 1000);
            } else {
                card.toggleClass('flip').toggleClass(`flip-${reward.rarity}`);
                playSound(reward.rarity);
                
                if (card.hasClass('flip')) {
                    addGifParticles(card.find('.card-back'), reward.rarity);
                    $('.card').not('.flip').find('.front-text').text('Click to see what you missed');
                    if (!$('.card').hasClass('rewarded')) {
                        grantReward(userId, reward.name);
                        card.addClass('rewarded');
                    }
                }
            }
        });
    });
}


function grantReward(userId, rewardType) {
    $.ajax({
        url: 'api/grantRewardToUser.php',
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
                alert("Erreur lors de l'attribution de la récompense.");
            } else if (response) {
                console.log("Récompense attribuée avec succès.");
            } else {
                console.warn("La réponse de l'API est vide ou invalide.");
            }
        },
        error: function(xhr, status, error) {
            console.error("Erreur AJAX :", error);
            alert("Erreur lors de la connexion à l'API.");
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

// Temporary 
$('#giveKeyButton').click(function () {
    if (!userId) {
        alert("Please login first");
        return;
    }

    $.ajax({
        url: 'api/grantKeyToUser.php',
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
