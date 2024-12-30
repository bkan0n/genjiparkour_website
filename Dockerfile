FROM asimlqt/php-apache:8.3-dev

# COPY ./000-default.conf /etc/apache2/sites-available/

# COPY ./php.ini /usr/local/etc/php/

COPY ./src /var/www/html

RUN chown www-data /var/www/html/api/rankcard/rankcardRequests
