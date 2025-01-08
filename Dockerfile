FROM asimlqt/php-apache:8.3

# COPY ./000-default.conf /etc/apache2/sites-available/

# COPY ./php.ini /usr/local/etc/php/

COPY ./src /var/www/html