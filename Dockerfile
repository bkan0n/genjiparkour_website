FROM asimlqt/php-apache:8.3

# COPY ./000-default.conf /etc/apache2/sites-available/

# COPY ./php.ini /usr/local/etc/php/

RUN a2enmod rewrite && systemctl restart apache2

COPY ./src /var/www/html